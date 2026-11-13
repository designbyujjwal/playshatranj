import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import type { HandTrackingState, HandLandmarkPoint, OneEuroFilterParams } from '../types';
import { OneEuroFilter, OneEuroFilter2D } from '../utils/oneEuroFilter';

export type HandTrackingCallback = (state: HandTrackingState) => void;

const DEFAULT_FILTER_PARAMS: OneEuroFilterParams = {
  minCutoff: 1.2, // Minimum cutoff frequency in Hz (controls stationary jitter)
  beta: 0.015,    // Speed coefficient (controls responsiveness and lag reduction)
  dCutoff: 1.0,   // Derivative cutoff frequency in Hz
};

const STORAGE_KEY = 'spatial_chess_one_euro_params';

function loadStoredParams(): OneEuroFilterParams {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        minCutoff: typeof parsed.minCutoff === 'number' ? parsed.minCutoff : DEFAULT_FILTER_PARAMS.minCutoff,
        beta: typeof parsed.beta === 'number' ? parsed.beta : DEFAULT_FILTER_PARAMS.beta,
        dCutoff: typeof parsed.dCutoff === 'number' ? parsed.dCutoff : DEFAULT_FILTER_PARAMS.dCutoff,
      };
    }
  } catch (e) {
    // Ignore storage parse error
  }
  return { ...DEFAULT_FILTER_PARAMS };
}

export class HandTrackingService {
  private handLandmarker: HandLandmarker | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;
  private callbacks: Set<HandTrackingCallback> = new Set();

  // 1€ (One-Euro) Filters for adaptive jitter reduction and responsive dynamics
  private filterParams: OneEuroFilterParams = loadStoredParams();
  // The cursor lives in 0..1 screen units, where hand speeds are small numbers; the speed coefficient is
  // scaled up for it so quick moves are followed closely instead of trailing behind the hand
  private static CURSOR_BETA_SCALE = 90;
  private cursorFilter = new OneEuroFilter2D(
    this.filterParams.minCutoff,
    this.filterParams.beta * HandTrackingService.CURSOR_BETA_SCALE,
    this.filterParams.dCutoff
  );

  // While pinched, the cursor rides on the palm at the offset it had when the pinch closed, so opening the
  // fingers to let go cannot pull it (and the piece) off the highlighted square
  private pinchAnchorOffset: { x: number; y: number } | null = null;
  // The cursor as the release began; held still until the release is confirmed and the piece is dropped
  private releaseHold: { x: number; y: number } | null = null;
  private pinchFilter = new OneEuroFilter(
    this.filterParams.minCutoff,
    this.filterParams.beta,
    this.filterParams.dCutoff
  );

  // Scale-invariant hysteresis thresholds for pinch
  private pinchMachineState: 'OPEN' | 'ENGAGING' | 'PINCHED' | 'RELEASING' = 'OPEN';
  private isPinchingState = false;
  private readonly PINCH_ENTER_RATIO = 0.32; // Trigger pinch when pinchRatio <= this
  private readonly PINCH_EXIT_RATIO = 0.52;  // Release pinch when pinchRatio >= this
  
  // State-machine based deliberate gesture confirmation counters, in camera frames (~33 ms each at the requested 30 fps)
  private pinchEngageFrames = 0;
  private pinchReleaseFrames = 0;
  private readonly ENGAGE_CONFIRM_THRESHOLD = 3;  // ~100 ms of stable 'pinched' signal before triggering interaction
  private readonly RELEASE_CONFIRM_THRESHOLD = 2; // ~67 ms of stable release signal before dropping object

  // Hand tracking loss grace period (prevents dropping pieces, and the pointer blinking, on momentary camera dropouts)
  private lostHandGraceFrames = 0;
  private readonly MAX_LOST_GRACE_FRAMES = 5; // ~170 ms at 30 fps

  // Each camera frame is read once. The display refreshes 60-120 times a second but the camera delivers ~30
  // frames: reading the same frame again cost a full detection and a re-render, and its repeated position made
  // the 1€ filter see each real move happen in a few milliseconds, so it opened up and let the jitter through.
  private lastVideoTime = -1;

  // FPS tracking
  private lastFrameTime = performance.now();
  private frameCount = 0;
  private currentFps = 0;
  private fpsInterval: NodeJS.Timeout | null = null;

  public state: HandTrackingState = {
    isSupported: typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia,
    isLoading: false,
    isEnabled: false,
    isHandDetected: false,
    isPinching: false,
    isOpenHand: true,
    handOpenness: 1.0,
    gesture: 'open',
    pinchDistance: 1,
    pinchProgress: 0,
    cursorPosition2D: { x: 0.5, y: 0.5 },
    cursorPosition3D: null,
    landmarks: null,
    fps: 0,
    filterParams: { ...this.filterParams },
    error: null,
  };

  public subscribe(cb: HandTrackingCallback): () => void {
    this.callbacks.add(cb);
    cb(this.state);
    return () => this.callbacks.delete(cb);
  }

  private notify() {
    this.callbacks.forEach((cb) => cb({ ...this.state }));
  }

  public getFilterParams(): OneEuroFilterParams {
    return { ...this.filterParams };
  }

  public setFilterParams(params: Partial<OneEuroFilterParams>) {
    this.filterParams = {
      ...this.filterParams,
      ...params,
    };
    this.cursorFilter.setParams(
      this.filterParams.minCutoff,
      this.filterParams.beta * HandTrackingService.CURSOR_BETA_SCALE,
      this.filterParams.dCutoff
    );
    this.pinchFilter.setParams(
      this.filterParams.minCutoff,
      this.filterParams.beta,
      this.filterParams.dCutoff
    );
    this.state.filterParams = { ...this.filterParams };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.filterParams));
    } catch (e) {
      // Ignore storage error
    }

    this.notify();
  }

  public resetFilterParams() {
    this.setFilterParams(DEFAULT_FILTER_PARAMS);
  }

  /**
   * The camera preview and the hidden fallback are different <video> elements that swap as panels open and
   * the control mode changes. Whichever one is mounted takes over the live stream so the feed is never
   * left on an element that is no longer on screen.
   */
  public attachVideoElement(el: HTMLVideoElement | null) {
    if (!el || el === this.videoElement) return;
    if (!this.isRunning && !this.state.isLoading) return;
    const stream = this.getVideoStream();
    const previous = this.videoElement;
    this.videoElement = el;
    if (stream) {
      el.srcObject = stream;
      el.play().catch(() => {});
    }
    if (previous) {
      // Start-up may still be waiting for the old element to report its metadata; let it carry on
      const pending = previous.onloadedmetadata;
      previous.onloadedmetadata = null;
      previous.srcObject = null;
      if (pending && stream) pending.call(previous, new Event('loadedmetadata'));
    }
  }

  public getVideoStream(): MediaStream | null {
    if (this.videoElement && this.videoElement.srcObject instanceof MediaStream) {
      return this.videoElement.srcObject;
    }
    return null;
  }

  public async initialize(
    videoElement: HTMLVideoElement,
    cameraDeviceId?: string,
    existingStream?: MediaStream
  ): Promise<boolean> {
    if (!this.state.isSupported) {
      this.state.error = 'Webcam hand tracking is not supported on this browser/device.';
      this.state.isLoading = false;
      this.state.isEnabled = false;
      this.notify();
      return false;
    }

    this.videoElement = videoElement;
    this.state.isLoading = true;
    this.state.error = null;
    this.notify();

    try {
      let stream = existingStream;

      if (!stream) {
        // 1. Check permissions query if available to avoid unnecessary exceptions if already blocked
        if (typeof navigator !== 'undefined' && navigator.permissions && navigator.permissions.query) {
          try {
            const perm = await navigator.permissions.query({ name: 'camera' as PermissionName });
            if (perm.state === 'denied') {
              this.state.isLoading = false;
              this.state.isEnabled = false;
              this.state.error = 'Camera permission is denied. You can play using mouse drag-and-drop, or allow camera in browser site settings.';
              this.notify();
              return false;
            }
          } catch {
            // navigator.permissions.query({ name: 'camera' }) not supported on all browsers (e.g. Safari), proceed to getUserMedia
          }
        }

        // 2. Request webcam video stream
        const constraints: MediaStreamConstraints = {
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            frameRate: { ideal: 30, max: 60 },
            facingMode: 'user',
            deviceId: cameraDeviceId ? { exact: cameraDeviceId } : undefined,
          },
          audio: false,
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      this.videoElement.srcObject = stream;
      await new Promise<void>((resolve) => {
        if (!this.videoElement) return resolve();
        this.videoElement.onloadedmetadata = () => {
          this.videoElement?.play().then(() => resolve()).catch(() => resolve());
        };
      });

      // 3. Initialize MediaPipe FilesetResolver & HandLandmarker if not already cached
      if (!this.handLandmarker) {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );

        try {
          this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
              delegate: 'GPU',
            },
            runningMode: 'VIDEO',
            numHands: 1,
            minHandDetectionConfidence: 0.65,
            minHandPresenceConfidence: 0.65,
            minTrackingConfidence: 0.65,
          });
        } catch (gpuErr) {
          console.warn('GPU acceleration unavailable for HandLandmarker, falling back to CPU:', gpuErr);
          this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            },
            runningMode: 'VIDEO',
            numHands: 1,
            minHandDetectionConfidence: 0.65,
            minHandPresenceConfidence: 0.65,
            minTrackingConfidence: 0.65,
          });
        }
      }

      this.state.isLoading = false;
      this.state.isEnabled = true;
      this.state.error = null;
      this.isRunning = true;
      this.notify();

      // Start FPS counter
      if (this.fpsInterval) clearInterval(this.fpsInterval);
      this.fpsInterval = setInterval(() => {
        this.currentFps = this.frameCount;
        this.frameCount = 0;
        this.state.fps = this.currentFps;
      }, 1000);

      // Start detection loop
      this.processVideoLoop();
      return true;
    } catch (err: unknown) {
      const errorObj = err as Error;
      const isPermissionDenied =
        errorObj?.name === 'NotAllowedError' ||
        errorObj?.name === 'PermissionDeniedError' ||
        errorObj?.message?.toLowerCase().includes('permission') ||
        errorObj?.message?.toLowerCase().includes('denied');

      if (isPermissionDenied) {
        console.warn('Webcam permission not granted or dismissed:', errorObj?.message || err);
        this.state.error = 'Camera permission was denied. You can play using mouse drag-and-drop, or click Enable to allow camera access.';
      } else {
        console.warn('Hand tracking initialization could not complete:', errorObj?.message || err);
        this.state.error = errorObj?.message || 'Failed to access camera or load hand tracking model.';
      }

      this.state.isLoading = false;
      this.state.isEnabled = false;
      this.notify();
      return false;
    }
  }

  private processVideoLoop = () => {
    if (!this.isRunning || !this.videoElement || !this.handLandmarker) return;

    if (this.videoElement.readyState >= 2 && this.videoElement.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = this.videoElement.currentTime;
      const startTimeMs = performance.now();
      try {
        const results = this.handLandmarker.detectForVideo(this.videoElement, startTimeMs);
        this.frameCount++;

        if (results.landmarks && results.landmarks.length > 0 && results.landmarks[0].length >= 21) {
          this.lostHandGraceFrames = 0;
          const rawLandmarks = results.landmarks[0];
          
          // Map landmarks with mirror-x adjustment (1 - x) so moving right mirrors to right
          const landmarks: HandLandmarkPoint[] = rawLandmarks.map((lm) => ({
            x: 1.0 - lm.x,
            y: lm.y,
            z: lm.z,
          }));

          // 3D Distance in normalized camera space
          const dist3D = (a: HandLandmarkPoint, b: HandLandmarkPoint) => {
            const dX = a.x - b.x;
            const dY = a.y - b.y;
            const dZ = (a.z - b.z) * 1.15;
            return Math.sqrt(dX * dX + dY * dY + dZ * dZ);
          };

          // 1. Compute physical hand scale (palm reference size)
          const palmLength = dist3D(landmarks[0], landmarks[9]);
          const palmWidth = dist3D(landmarks[5], landmarks[17]);
          const handScale = Math.max(0.06, (palmLength + palmWidth) * 0.5);

          // 2. Measure scale-invariant pinch distance (Landmark 4: Thumb Tip, Landmark 8: Index Tip)
          const thumbTip = landmarks[4];
          const indexTip = landmarks[8];
          const rawPinchDist = dist3D(thumbTip, indexTip);
          const rawPinchRatio = rawPinchDist / handScale;

          // 3. Measure finger extensions to detect crisp deliberate OPEN HAND state
          // Tips: 8 (index), 12 (middle), 16 (ring), 20 (pinky)
          // MCPs: 5 (index), 9 (middle), 13 (ring), 17 (pinky)
          const middleExt = dist3D(landmarks[12], landmarks[9]) / handScale;
          const ringExt = dist3D(landmarks[16], landmarks[13]) / handScale;
          const pinkyExt = dist3D(landmarks[20], landmarks[17]) / handScale;

          // Openness score based on extended fingers (0 = closed/fist, 1 = fully open hand)
          const avgOtherFingersExt = (middleExt + ringExt + pinkyExt) / 3;
          const rawOpenness = Math.max(0, Math.min(1, (avgOtherFingersExt - 0.45) / 0.50));
          const isOpenHand = rawOpenness >= 0.70 && rawPinchRatio >= 0.45;

          // 4. Filter pinch ratio with 1€ filter for smooth, jitterless gesture progress
          const filteredPinchRatio = this.pinchFilter.filter(rawPinchRatio, startTimeMs);

          // 5. Explicit State-Machine Based Gesture Debounce
          // States: 'OPEN' -> 'ENGAGING' (requires 5 consecutive stable frames) -> 'PINCHED' -> 'RELEASING' (requires 4 consecutive frames) -> 'OPEN'
          const wantsPinch = filteredPinchRatio <= this.PINCH_ENTER_RATIO || rawPinchDist <= 0.040;
          const wantsRelease = (filteredPinchRatio >= this.PINCH_EXIT_RATIO && rawPinchRatio >= 0.42) || (isOpenHand && rawPinchRatio >= 0.46);

          switch (this.pinchMachineState) {
            case 'OPEN':
              if (wantsPinch) {
                this.pinchMachineState = 'ENGAGING';
                this.pinchEngageFrames = 1;
              } else {
                this.pinchEngageFrames = 0;
              }
              this.isPinchingState = false;
              break;

            case 'ENGAGING':
              if (wantsPinch) {
                this.pinchEngageFrames++;
                if (this.pinchEngageFrames >= this.ENGAGE_CONFIRM_THRESHOLD) {
                  this.pinchMachineState = 'PINCHED';
                  this.isPinchingState = true;
                  this.pinchReleaseFrames = 0;
                }
              } else {
                // Signal broke before reaching the 5-frame stability threshold
                this.pinchMachineState = 'OPEN';
                this.pinchEngageFrames = 0;
                this.isPinchingState = false;
              }
              break;

            case 'PINCHED':
              this.isPinchingState = true;
              if (wantsRelease) {
                this.pinchMachineState = 'RELEASING';
                this.pinchReleaseFrames = 1;
              } else {
                this.pinchReleaseFrames = 0;
              }
              break;

            case 'RELEASING':
              this.isPinchingState = true; // Hold pinch state until release is fully confirmed
              if (wantsRelease) {
                this.pinchReleaseFrames++;
                if (this.pinchReleaseFrames >= this.RELEASE_CONFIRM_THRESHOLD) {
                  this.pinchMachineState = 'OPEN';
                  this.isPinchingState = false;
                  this.pinchEngageFrames = 0;
                  this.pinchReleaseFrames = 0;
                }
              } else {
                // Re-pinched before release threshold completed; retain pinched lock
                this.pinchMachineState = 'PINCHED';
                this.pinchReleaseFrames = 0;
              }
              break;
          }

          // Normalized progress for UI feedback (0 = open, 1 = pinched)
          const pinchProgress = Math.max(
            0,
            Math.min(1, 1 - (filteredPinchRatio - this.PINCH_ENTER_RATIO) / (this.PINCH_EXIT_RATIO - this.PINCH_ENTER_RATIO))
          );

          // 6. Cursor anchor. Open hand: the index tip, blending toward the thumb-index midpoint as the
          // fingers close. Pinched: the palm (which does not move when the fingers open) plus the offset the
          // pinch point had when it closed. Releasing: held where it was, so the drop lands where it was aimed.
          const pinchBlend = Math.max(0, Math.min(1, pinchProgress));
          let targetAnchorX = indexTip.x * (1 - pinchBlend * 0.5) + thumbTip.x * (pinchBlend * 0.5);
          let targetAnchorY = indexTip.y * (1 - pinchBlend * 0.5) + thumbTip.y * (pinchBlend * 0.5);
          const palmX = (landmarks[0].x + landmarks[5].x + landmarks[9].x + landmarks[17].x) / 4;
          const palmY = (landmarks[0].y + landmarks[5].y + landmarks[9].y + landmarks[17].y) / 4;
          if (this.isPinchingState) {
            if (!this.pinchAnchorOffset) {
              const midX = (indexTip.x + thumbTip.x) / 2, midY = (indexTip.y + thumbTip.y) / 2;
              this.pinchAnchorOffset = { x: midX - palmX, y: midY - palmY };
            }
            targetAnchorX = palmX + this.pinchAnchorOffset.x;
            targetAnchorY = palmY + this.pinchAnchorOffset.y;
          } else {
            this.pinchAnchorOffset = null;
          }

          let filteredCursor = this.cursorFilter.filter(targetAnchorX, targetAnchorY, startTimeMs);
          if (this.pinchMachineState === 'RELEASING') {
            if (!this.releaseHold) this.releaseHold = { ...this.state.cursorPosition2D };
            filteredCursor = this.releaseHold;
          } else {
            this.releaseHold = null;
          }

          const currentGesture: 'open' | 'pinching' | 'pointing' = this.isPinchingState
            ? 'pinching'
            : isOpenHand
            ? 'open'
            : 'pointing';

          this.state.isHandDetected = true;
          this.state.isPinching = this.isPinchingState;
          this.state.isOpenHand = isOpenHand;
          this.state.handOpenness = rawOpenness;
          this.state.gesture = currentGesture;
          this.state.pinchDistance = filteredPinchRatio;
          this.state.pinchProgress = pinchProgress;
          this.state.cursorPosition2D = {
            x: Math.max(0, Math.min(1, filteredCursor.x)),
            y: Math.max(0, Math.min(1, filteredCursor.y)),
          };
          this.state.landmarks = landmarks;
        } else {
          // Hand lost or momentary camera occlusion: use grace period before discarding state
          if (this.state.isHandDetected) {
            this.lostHandGraceFrames++;
            if (this.lostHandGraceFrames > this.MAX_LOST_GRACE_FRAMES) {
              this.cursorFilter.reset();
              this.pinchFilter.reset();
              this.pinchAnchorOffset = null;
              this.releaseHold = null;
              this.pinchMachineState = 'OPEN';
              this.isPinchingState = false;
              this.pinchEngageFrames = 0;
              this.pinchReleaseFrames = 0;
              this.state.isHandDetected = false;
              this.state.isPinching = false;
              this.state.isOpenHand = true;
              this.state.handOpenness = 1.0;
              this.state.gesture = 'open';
              this.state.pinchProgress = 0;
              this.state.landmarks = null;
            }
          }
        }

        this.notify();
      } catch (err) {
        // Suppress frame dropped warning
      }
    }

    this.animationFrameId = requestAnimationFrame(this.processVideoLoop);
  };

  public stop() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.fpsInterval) {
      clearInterval(this.fpsInterval);
      this.fpsInterval = null;
    }
    if (this.videoElement && this.videoElement.srcObject) {
      const stream = this.videoElement.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      this.videoElement.srcObject = null;
    }
    this.state.isEnabled = false;
    this.state.isHandDetected = false;
    this.state.isPinching = false;
    this.state.landmarks = null;
    this.lastVideoTime = -1;
    this.pinchMachineState = 'OPEN';
    this.isPinchingState = false;
    this.pinchEngageFrames = 0;
    this.pinchReleaseFrames = 0;
    this.notify();
  }
}

export const handTracker = new HandTrackingService();
