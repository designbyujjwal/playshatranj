/**
 * 1€ (One-Euro) Filter
 * 
 * An adaptive first-order low-pass filter with low latency and adaptive cutoff frequency.
 * Reference: Casiez, G., Roussel, N. and Vogel, D. (2012)
 * "1€ Filter: A Simple Speed-based Low-pass Filter for Noisy Input in Human-Computer Interaction"
 */

class LowPassFilter {
  private y: number | null = null;
  private s: number | null = null;

  constructor(private alpha: number = 0) {}

  public filter(value: number, alpha: number): number {
    this.alpha = alpha;
    if (this.y === null) {
      this.s = value;
      this.y = value;
      return value;
    }
    const result = alpha * value + (1.0 - alpha) * this.s!;
    this.s = result;
    this.y = result;
    return result;
  }

  public hasLastRawValue(): boolean {
    return this.y !== null;
  }

  public lastRawValue(): number {
    return this.y ?? 0;
  }

  public reset() {
    this.y = null;
    this.s = null;
  }
}

export class OneEuroFilter {
  private xFilter = new LowPassFilter();
  private dxFilter = new LowPassFilter();
  private lastTime: number | null = null;

  constructor(
    public minCutoff: number = 1.0, // Minimum cutoff frequency (Hz). Controls jitter at rest.
    public beta: number = 0.007,    // Speed coefficient. Controls lag reduction during rapid motions.
    public dCutoff: number = 1.0    // Cutoff frequency for derivative (Hz).
  ) {}

  public setParams(minCutoff: number, beta: number, dCutoff: number = 1.0) {
    this.minCutoff = minCutoff;
    this.beta = beta;
    this.dCutoff = dCutoff;
  }

  private calculateAlpha(cutoff: number, dt: number): number {
    const tau = 1.0 / (2.0 * Math.PI * cutoff);
    return 1.0 / (1.0 + tau / dt);
  }

  public filter(value: number, timestamp: number = performance.now()): number {
    if (this.lastTime === null) {
      this.lastTime = timestamp;
      return this.xFilter.filter(value, 1.0);
    }

    let dt = (timestamp - this.lastTime) / 1000.0;
    this.lastTime = timestamp;

    // Guard against anomalous or zero delta times
    if (dt <= 0.0001 || dt > 1.0) {
      dt = 1.0 / 60.0;
    }

    // Estimate current rate of change (derivative)
    const dx = this.xFilter.hasLastRawValue()
      ? (value - this.xFilter.lastRawValue()) / dt
      : 0.0;

    // Filter derivative
    const edx = this.dxFilter.filter(dx, this.calculateAlpha(this.dCutoff, dt));

    // Compute dynamic adaptive cutoff frequency based on velocity
    const cutoff = this.minCutoff + this.beta * Math.abs(edx);

    // Filter main signal with adaptive cutoff
    return this.xFilter.filter(value, this.calculateAlpha(cutoff, dt));
  }

  public reset() {
    this.xFilter.reset();
    this.dxFilter.reset();
    this.lastTime = null;
  }
}

/**
 * 2D 1€ Filter for screen coordinate tracking (X, Y)
 */
export class OneEuroFilter2D {
  private filterX: OneEuroFilter;
  private filterY: OneEuroFilter;

  constructor(minCutoff: number = 1.0, beta: number = 0.007, dCutoff: number = 1.0) {
    this.filterX = new OneEuroFilter(minCutoff, beta, dCutoff);
    this.filterY = new OneEuroFilter(minCutoff, beta, dCutoff);
  }

  public setParams(minCutoff: number, beta: number, dCutoff: number = 1.0) {
    this.filterX.setParams(minCutoff, beta, dCutoff);
    this.filterY.setParams(minCutoff, beta, dCutoff);
  }

  public filter(x: number, y: number, timestamp: number = performance.now()): { x: number; y: number } {
    return {
      x: this.filterX.filter(x, timestamp),
      y: this.filterY.filter(y, timestamp),
    };
  }

  public reset() {
    this.filterX.reset();
    this.filterY.reset();
  }
}
