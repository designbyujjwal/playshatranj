import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TornOldBookPage, WaxSeal } from './TornOldBookPage';
import { holdSceneRender } from '../three/renderHold';

/** When the letter has landed on the page; the timing itself lives in index.css (.cei-*). */
const LANDED_MS = 5150;
/** Length of the fade that hands over to the real page (.cei-leaving). */
const FADE_MS = 650;
/** Longest the landed letter waits for the study's first frames before handing over anyway. */
const MAX_HOLD_MS = 1500;

/** The invitation page behind the intro. The letter is the same paper and lands exactly on it. */
const FOLIO_ID = 'courier-invite-codex-folio';

// The envelope is drawn in a 600 x 400 space, its top flap in 600 x 260
const FLAP = 'M0,0 L600,0 L318,222 Q300,236 282,222 Z';
const FLAP_EDGE = 'M0,0 L282,222 Q300,236 318,222 L600,0';
const FLAP_LINER = 'M29,0 L289,204 Q300,213 311,204 L571,0 Z';
const FLAP_LINER_RULE = 'M38.7,0 L292.7,199.3 Q300,205.5 307.3,199.3 L561.3,0';
const SIDE_L = 'M0,0 L300,206 L0,400 Z';
const SIDE_R = 'M600,0 L300,206 L600,400 Z';
const BOTTOM = 'M0,400 L286,198 Q300,188 314,198 L600,400 Z';
const BOTTOM_EDGE = 'M0,400 L286,198 Q300,188 314,198 L600,400';
const THROAT = 'M0,0 L300,206 L600,0';
// Gilt rules that follow the edges of the top and bottom flaps, 9 and 13 units inside them
const FLAP_GILT = 'M14.6,0 L290,216.8 Q300,225 310,216.8 L585.4,0';
const FLAP_GILT_FINE = 'M21,0 L291.5,212.9 Q300,220 308.5,212.9 L579,0';
const BOTTOM_GILT = 'M15.6,400 L288,207.6 Q300,199 312,207.6 L584.4,400';
const BOTTOM_GILT_FINE = 'M22.5,400 L289.5,211.5 Q300,204 310.5,211.5 L577.5,400';
// Small gilt star between two lozenges, at the foot of the bottom flap
const ORNAMENT =
  'M300,340 Q301.6,350.4 312,352 Q301.6,353.6 300,364 Q298.4,353.6 288,352 Q298.4,350.4 300,340 Z M277,352 l-3.4,-3.4 l-3.4,3.4 l3.4,3.4 Z M323,352 l3.4,-3.4 l3.4,3.4 l-3.4,3.4 Z';
const SEAL_AT = { x: 300, y: 226 };
const SEAL_SCALE = 1.05;
// The matrix of the seal: the ring it pressed into the paper
const SEAL_RING = 40;

interface Metrics {
  ex: number; ey: number; ew: number; eh: number;
  px: number; py: number; pw: number; ph: number;
  fold: number; s: number; lx: number; ly: number; lyo: number;
}

const measure = (): Metrics => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let pw = Math.min(896, vw - 32);
  let ph = Math.round(pw * 0.8);
  let px = (vw - pw) / 2;
  let py = 95;
  const folio = document.getElementById(FOLIO_ID);
  if (folio && folio.offsetWidth > 0 && folio.offsetHeight > 0) {
    const r = folio.getBoundingClientRect();
    px = r.left;
    py = r.top;
    pw = Math.round(folio.offsetWidth);
    ph = Math.round(folio.offsetHeight);
  }

  const ew = Math.min(560, vw * 0.84, vh * 0.74);
  const eh = ew / 1.5;
  const ex = (vw - ew) / 2;
  const ey = vh / 2 - eh * 0.21;

  // The letter is folded in half and scaled down to fit the envelope
  const fold = Math.round(ph / 2);
  const s = Math.min((0.94 * ew) / pw, (0.8 * eh) / fold);
  const lx = ex + (ew - pw * s) / 2 - px;
  const ly = ey + eh * 0.12 - ph * s * 0.033 - py;
  const lyo = ey + eh * 0.03 - fold * s - py;

  return { ex, ey, ew, eh, px, py, pw, ph, fold, s, lx, ly, lyo };
};

const sameMetrics = (a: Metrics | null, b: Metrics) =>
  !!a && (Object.keys(b) as (keyof Metrics)[]).every((k) => Math.abs(a[k] - b[k]) < 0.01);

const inscribed = new WeakMap<HTMLElement, string>();

/** Copies the invitation as it stands on the page onto the inside of the letter, for show only. */
const inscribe = (sheets: (HTMLElement | null)[]) => {
  const writing = document.getElementById(FOLIO_ID)?.lastElementChild;
  const html = writing?.outerHTML ?? '';
  sheets.forEach((sheet) => {
    // Repainting the sheets mid-flight would cost frames, so they are only rewritten when the page has changed
    if (!sheet || inscribed.get(sheet) === html) return;
    inscribed.set(sheet, html);
    const copy = writing?.cloneNode(true) as HTMLElement | undefined;
    copy?.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
    sheet.setAttribute('inert', '');
    sheet.replaceChildren(...(copy ? [copy] : []));
  });
};

/** The invitation screen is opaque, so the study's loading veil has nothing to hide here: it lifts without its fade. */
const liftVeil = () => {
  const veil = document.getElementById('veil');
  if (!veil) return;
  veil.style.transition = 'none';
  veil.classList.add('gone');
};

/** Shared paper, liner and shadow definitions for the envelope drawings. */
const EnvelopeDefs: React.FC = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      <clipPath id="cei-clip-env"><rect x="0" y="0" width="600" height="400" rx="7" /></clipPath>
      <clipPath id="cei-clip-pocket"><path d={SIDE_L} /><path d={SIDE_R} /><path d={BOTTOM} /></clipPath>
      <clipPath id="cei-clip-flap"><path d={FLAP} /></clipPath>
      {/* Everything the closed flap leaves uncovered */}
      <clipPath id="cei-clip-off-flap"><path d={`M-20,-20 H620 V420 H-20 Z ${FLAP}`} clipRule="evenodd" /></clipPath>

      <linearGradient id="cei-g-left" x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0" stopColor="#ead0a0" /><stop offset="1" stopColor="#cdaa72" />
      </linearGradient>
      <linearGradient id="cei-g-right" x1="1" y1="0.3" x2="0" y2="0">
        <stop offset="0" stopColor="#c09b62" /><stop offset="1" stopColor="#b48e56" />
      </linearGradient>
      <linearGradient id="cei-g-bottom" x1="0.2" y1="0" x2="0.5" y2="1">
        <stop offset="0" stopColor="#f5e0b2" /><stop offset=".6" stopColor="#e6cb96" /><stop offset="1" stopColor="#d2b27a" />
      </linearGradient>
      <linearGradient id="cei-g-flap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f4dfb3" /><stop offset=".8" stopColor="#e8cd99" /><stop offset="1" stopColor="#dec08a" />
      </linearGradient>
      <linearGradient id="cei-g-inner" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e2cb9b" /><stop offset="1" stopColor="#d0b582" />
      </linearGradient>
      <linearGradient id="cei-g-liner" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8b2229" /><stop offset="1" stopColor="#5c1218" />
      </linearGradient>
      <linearGradient id="cei-g-liner-flap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6a161c" /><stop offset="1" stopColor="#92262d" />
      </linearGradient>
      <linearGradient id="cei-g-depth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0a0301" stopOpacity=".12" /><stop offset="1" stopColor="#0a0301" stopOpacity=".62" />
      </linearGradient>

      {/* The letter inside puffs the envelope out: lighter where it bulges toward the lamp, shaded toward the edges */}
      <radialGradient id="cei-g-pillow" gradientUnits="userSpaceOnUse" cx="270" cy="255" r="380">
        <stop offset="0" stopColor="#fff7e0" stopOpacity=".5" /><stop offset=".42" stopColor="#fff7e0" stopOpacity="0" />
        <stop offset=".68" stopColor="#2a1404" stopOpacity="0" /><stop offset="1" stopColor="#2a1404" stopOpacity=".6" />
      </radialGradient>
      <radialGradient id="cei-g-flap-pillow" gradientUnits="userSpaceOnUse" cx="235" cy="70" r="330">
        <stop offset="0" stopColor="#fff7e0" stopOpacity=".45" /><stop offset=".45" stopColor="#fff7e0" stopOpacity="0" />
        <stop offset=".75" stopColor="#2a1404" stopOpacity="0" /><stop offset="1" stopColor="#2a1404" stopOpacity=".5" />
      </radialGradient>
      {/* The folded outer edges: the left one catches the light, the right and bottom ones turn away from it */}
      <linearGradient id="cei-g-edge-lit" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fffaf0" stopOpacity=".55" /><stop offset="1" stopColor="#fffaf0" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="cei-g-edge-shade" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stopColor="#1e0e03" stopOpacity=".5" /><stop offset="1" stopColor="#1e0e03" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="cei-g-edge-foot" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#1e0e03" stopOpacity=".4" /><stop offset="1" stopColor="#1e0e03" stopOpacity="0" />
      </linearGradient>

      <radialGradient id="cei-g-wax-back" cx="42%" cy="38%" r="70%">
        <stop offset="0" stopColor="#6d1f18" /><stop offset="1" stopColor="#47110d" />
      </radialGradient>
      <radialGradient id="cei-g-wax-stain">
        <stop offset="0" stopColor="#7a3a20" stopOpacity=".1" /><stop offset=".7" stopColor="#7a3a20" stopOpacity=".12" />
        <stop offset="1" stopColor="#7a3a20" stopOpacity="0" />
      </radialGradient>

      {/* Gold foil of the gilt rules, banded like burnished leaf */}
      <linearGradient id="cei-g-gold" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="150">
        <stop offset="0" stopColor="#9c6c1c" /><stop offset=".17" stopColor="#f0cb62" /><stop offset=".34" stopColor="#ad7b22" />
        <stop offset=".5" stopColor="#ffe08a" /><stop offset=".67" stopColor="#a8761f" /><stop offset=".84" stopColor="#ecc35a" />
        <stop offset="1" stopColor="#96671a" />
      </linearGradient>
      {/* Candlelight falling across the paper from the upper left */}
      <linearGradient id="cei-g-sheen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff6dc" stopOpacity=".55" /><stop offset=".45" stopColor="#fff6dc" stopOpacity="0" />
        <stop offset="1" stopColor="#2a1404" stopOpacity=".4" />
      </linearGradient>

      {/* Gold lattice of the crimson liner */}
      <pattern id="cei-lattice" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M10,0 V20 M0,10 H20" stroke="#c9962e" strokeOpacity=".34" strokeWidth=".9" />
        <rect x="8.4" y="8.4" width="3.2" height="3.2" fill="#dcb152" fillOpacity=".6" transform="rotate(45 10 10)" />
      </pattern>

      {/* The same grain and stain recipe as the court-book paper */}
      <filter id="cei-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" seed="11" />
        <feColorMatrix values="0 0 0 0 0.27  0 0 0 0 0.15  0 0 0 0 0.05  1.7 0 0 0 -0.6" />
      </filter>
      <filter id="cei-stain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.008" numOctaves="4" seed="23" />
        <feColorMatrix values="0 0 0 0 0.64  0 0 0 0 0.4  0 0 0 0 0.16  2.2 0 0 0 -0.82" />
      </filter>
      <filter id="cei-blur2" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2" /></filter>
      <filter id="cei-blur4" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="4" /></filter>
      <filter id="cei-blur8" x="-15%" y="-25%" width="130%" height="150%"><feGaussianBlur stdDeviation="8" /></filter>
      <filter id="cei-blur14" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="14" /></filter>
    </defs>
  </svg>
);

/** Grain, stains and a darkened rim, laid over a drawn paper shape. */
const PaperAging: React.FC<{ h: number; rim?: string }> = ({ h, rim }) => (
  <>
    <rect width="600" height={h} filter="url(#cei-stain)" opacity=".34" style={{ mixBlendMode: 'multiply' }} />
    <rect width="600" height={h} filter="url(#cei-grain)" opacity=".26" style={{ mixBlendMode: 'multiply' }} />
    {rim && (
      <path d={rim} fill="none" stroke="#85552a" strokeOpacity=".5" strokeWidth="34" filter="url(#cei-blur14)" style={{ mixBlendMode: 'multiply' }} />
    )}
  </>
);

/** A pressed gold-foil line: the foil itself over the shadow of its impression. */
const GiltRule: React.FC<{ d: string; w: number }> = ({ d, w }) => (
  <>
    <path d={d} fill="none" stroke="#3d2408" strokeOpacity=".4" strokeWidth={w} transform="translate(0,.9)" />
    <path d={d} fill="none" stroke="url(#cei-g-gold)" strokeWidth={w} />
  </>
);

/**
 * Courier invitation intro: a sealed envelope floats into the centre of the screen,
 * the flap lifts with the wax seal still on it, and the folded letter slides out blank side up, then unfolds
 * to show the invitation and settles exactly where the invitation page is. Tap anywhere to skip.
 */
export const CourierEnvelopeIntro: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [m, setM] = useState<Metrics | null>(null);
  const [leaving, setLeaving] = useState(false);
  const topSheet = useRef<HTMLDivElement>(null);
  const bottomSheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      const t = window.setTimeout(onDone, 0);
      return () => window.clearTimeout(t);
    }
    // The study behind the invitation would compete for every frame, so it waits until the letter has landed
    const release = holdSceneRender();
    const started = performance.now();
    let t = 0;
    const leave = () => {
      release();
      // The study's first frames are its heaviest; the veil's `gone` marks them done, while the letter lies still
      const veil = document.getElementById('veil');
      if (veil && !veil.classList.contains('gone') && performance.now() - started < LANDED_MS + MAX_HOLD_MS) {
        t = window.setTimeout(leave, 80);
        return;
      }
      liftVeil();
      setLeaving(true);
      t = window.setTimeout(onDone, FADE_MS);
    };
    t = window.setTimeout(leave, LANDED_MS);
    return () => {
      window.clearTimeout(t);
      release();
    };
  }, [onDone]);

  useLayoutEffect(() => {
    const update = () => {
      const next = measure();
      setM((prev) => (sameMetrics(prev, next) ? prev : next));
      inscribe([topSheet.current, bottomSheet.current]);
    };
    update();
    window.addEventListener('resize', update);
    const folio = document.getElementById(FOLIO_ID);
    const ro = folio && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    if (folio && ro) ro.observe(folio);
    // The page can still settle while fonts load; the last pass is just before the letter unfolds
    const timers = [150, 500, 1200, 2600, 3700].map((ms) => window.setTimeout(update, ms));
    return () => {
      window.removeEventListener('resize', update);
      ro?.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // The letter's sheets exist once the page has been measured
  useLayoutEffect(() => inscribe([topSheet.current, bottomSheet.current]), [m]);

  const px = (n: number) => `${Math.round(n * 100) / 100}px`;
  const vars = m
    ? ({
        '--cei-ex': px(m.ex), '--cei-ey': px(m.ey), '--cei-ew': px(m.ew), '--cei-eh': px(m.eh),
        '--cei-px': px(m.px), '--cei-py': px(m.py), '--cei-pw': px(m.pw), '--cei-ph': px(m.ph),
        '--cei-fold': px(m.fold), '--cei-s': String(Math.round(m.s * 10000) / 10000),
        '--cei-lx': px(m.lx), '--cei-ly': px(m.ly), '--cei-lyo': px(m.lyo),
      } as React.CSSProperties)
    : undefined;

  const skip = () => {
    liftVeil();
    onDone();
  };

  const paper = (key: string, frame = true) =>
    m && (
      <TornOldBookPage id={`courier-intro-paper-${key}`} side="left" fixed scale={1} width={m.pw} height={m.ph} frame={frame}>
        {null}
      </TornOldBookPage>
    );

  return (
    <div className={leaving ? 'cei cei-leaving' : 'cei'} onClick={skip} aria-hidden="true" style={vars}>
      <div className="cei-glow" />
      <div className="absolute inset-0 pointer-events-none parchment-texture-overlay opacity-25" />
      <div className="absolute inset-0 pointer-events-none parchment-vignette opacity-55" />
      {m && (
        <div className="cei-rig">
          <EnvelopeDefs />

          {/* Behind the letter: the inside of the envelope and the opened flap */}
          <div className="cei-env cei-env-back">
            <div className="cei-env-shadow" />
            <svg className="cei-svg" viewBox="0 0 600 400" preserveAspectRatio="none">
              <g clipPath="url(#cei-clip-env)">
                <rect width="600" height="400" fill="url(#cei-g-inner)" />
                <rect x="13" y="0" width="574" height="388" fill="url(#cei-g-liner)" />
                <rect x="13" y="0" width="574" height="388" fill="url(#cei-lattice)" />
                <rect width="600" height="250" fill="url(#cei-g-depth)" />
                <path d={THROAT} fill="none" stroke="#0c0402" strokeOpacity=".6" strokeWidth="30" filter="url(#cei-blur8)" />
                <rect width="600" height="400" filter="url(#cei-grain)" opacity=".2" style={{ mixBlendMode: 'multiply' }} />
              </g>
            </svg>
            <div className="cei-flapbox">
              <div className="cei-flap cei-flap-b">
                <svg className="cei-svg" viewBox="0 0 600 260" preserveAspectRatio="none">
                  <path d={FLAP} fill="#0a0402" opacity=".55" filter="url(#cei-blur8)" />
                  {/* the back of the seal, still fast to the tip of the flap */}
                  <circle cx={SEAL_AT.x} cy={SEAL_AT.y} r="49" fill="url(#cei-g-wax-back)" stroke="#350c09" strokeOpacity=".7" strokeWidth="1.2" />
                  <circle cx={SEAL_AT.x} cy={SEAL_AT.y + 2} r="46" fill="none" stroke="#a5453a" strokeOpacity=".35" strokeWidth="2.4" filter="url(#cei-blur2)" />
                  <path d={FLAP} fill="url(#cei-g-inner)" />
                  <path d={FLAP_LINER} fill="url(#cei-g-liner-flap)" />
                  <path d={FLAP_LINER} fill="url(#cei-lattice)" />
                  <path d={FLAP_LINER_RULE} fill="none" stroke="#d2a544" strokeOpacity=".55" strokeWidth="1.2" />
                  <g clipPath="url(#cei-clip-flap)">
                    <PaperAging h={260} />
                    <path d="M0,0 H600" stroke="#1a0804" strokeOpacity=".5" strokeWidth="9" filter="url(#cei-blur4)" />
                  </g>
                  <path d={FLAP_EDGE} fill="none" stroke="#fff1cf" strokeOpacity=".45" strokeWidth="1.2" />
                </svg>
                <div className="cei-flap-light cei-flap-glint" />
              </div>
            </div>
          </div>

          {/* The letter: the invitation page's own paper, folded in half with the writing inside and its blank back showing */}
          <div className="cei-letter">
            <div className="cei-fold-shadow" />
            <div className="cei-half cei-half-top">
              <div className="cei-paper cei-paper-inner">
                {paper('top')}
                <div ref={topSheet} className="cei-writing" />
              </div>
            </div>
            <div className="cei-half cei-half-bottom">
              <div className="cei-paper cei-paper-lower">
                {paper('bottom')}
                <div ref={bottomSheet} className="cei-writing" />
              </div>
            </div>
            <div className="cei-half cei-half-cover">
              <div className="cei-paper cei-paper-flip">{paper('cover', false)}</div>
            </div>
          </div>

          {/* In front of the letter: the pocket and the sealed flap with its wax */}
          <div className="cei-env cei-env-front">
            <svg className="cei-svg" viewBox="0 0 600 400" preserveAspectRatio="none">
              <g clipPath="url(#cei-clip-env)">
                <path d={THROAT} fill="none" stroke="#120703" strokeOpacity=".5" strokeWidth="22" filter="url(#cei-blur4)" />
                <path d={SIDE_L} fill="url(#cei-g-left)" />
                <path d={SIDE_R} fill="url(#cei-g-right)" />
                <path d={BOTTOM_EDGE} fill="none" stroke="#2a1405" strokeOpacity=".5" strokeWidth="12" filter="url(#cei-blur4)" transform="translate(0,-2)" />
                <path d={BOTTOM} fill="url(#cei-g-bottom)" />
                <g clipPath="url(#cei-clip-pocket)">
                  <PaperAging h={400} rim="M0,0 V400 H600 V0" />
                  <rect width="600" height="400" fill="url(#cei-g-sheen)" style={{ mixBlendMode: 'soft-light' }} />
                  <rect width="600" height="400" fill="url(#cei-g-pillow)" style={{ mixBlendMode: 'soft-light' }} />
                  <rect x="0" width="16" height="400" fill="url(#cei-g-edge-lit)" />
                  <rect x="582" width="18" height="400" fill="url(#cei-g-edge-shade)" />
                  <rect y="384" width="600" height="16" fill="url(#cei-g-edge-foot)" />
                </g>
                <GiltRule d={BOTTOM_GILT} w={1.7} />
                <GiltRule d={BOTTOM_GILT_FINE} w={0.7} />
                <path d="M216,352 H266 M334,352 H384" fill="none" stroke="#b9872a" strokeWidth="1.1" />
                <path d={ORNAMENT} fill="#3d2408" fillOpacity=".4" transform="translate(0,.9)" />
                <path d={ORNAMENT} fill="#b9872a" />
                <path d={THROAT} fill="none" stroke="#f6e3b8" strokeOpacity=".5" strokeWidth="1.3" />
                <path d={BOTTOM_EDGE} fill="none" stroke="#fff1cf" strokeOpacity=".6" strokeWidth="1.4" />
                {/* Where the seal sat: the ring it pressed into the paper and a faint trace of wax below the flap */}
                <g clipPath="url(#cei-clip-pocket)">
                  <circle cx={SEAL_AT.x} cy={SEAL_AT.y} r={SEAL_RING} fill="none" stroke="#5a3312" strokeOpacity=".22" strokeWidth="1" />
                  <circle cx={SEAL_AT.x + 0.7} cy={SEAL_AT.y + 0.9} r={SEAL_RING} fill="none" stroke="#fff4d8" strokeOpacity=".28" strokeWidth=".9" />
                </g>
                <g clipPath="url(#cei-clip-off-flap)">
                  <circle cx={SEAL_AT.x} cy={SEAL_AT.y} r="46" fill="url(#cei-g-wax-stain)" filter="url(#cei-blur2)" style={{ mixBlendMode: 'multiply' }} />
                </g>
                <path d="M.6,0 V392.4 Q.6,399.4 7.6,399.4 H592.4 Q599.4,399.4 599.4,392.4 V0" fill="none" stroke="#6f4518" strokeOpacity=".5" strokeWidth="1.2" />
              </g>
            </svg>
            <svg className="cei-svg cei-flap-cast" viewBox="0 0 600 400" preserveAspectRatio="none">
              <g clipPath="url(#cei-clip-env)">
                <path d={FLAP} fill="#160903" opacity=".55" filter="url(#cei-blur8)" transform="translate(0,7)" />
                <path d={FLAP} fill="#160903" opacity=".5" filter="url(#cei-blur2)" transform="translate(1.5,2.5)" />
              </g>
            </svg>
            <div className="cei-flapbox">
              <div className="cei-flap cei-flap-a">
                <svg className="cei-svg" viewBox="0 0 600 260" preserveAspectRatio="none">
                  <path d={FLAP} fill="url(#cei-g-flap)" />
                  <g clipPath="url(#cei-clip-flap)">
                    <PaperAging h={260} rim={FLAP_EDGE} />
                    <rect width="600" height="260" fill="url(#cei-g-sheen)" style={{ mixBlendMode: 'soft-light' }} />
                    <rect width="600" height="260" fill="url(#cei-g-flap-pillow)" style={{ mixBlendMode: 'soft-light' }} />
                    <path d="M0,1 H600" stroke="#fff3d6" strokeOpacity=".6" strokeWidth="2" />
                    <GiltRule d={FLAP_GILT} w={1.7} />
                    <GiltRule d={FLAP_GILT_FINE} w={0.7} />
                    <path d={FLAP_EDGE} fill="none" stroke="#fff6dc" strokeOpacity=".5" strokeWidth="1.1" transform="translate(0,-1.7)" />
                  </g>
                  <path d={FLAP_EDGE} fill="none" stroke="#6f4518" strokeOpacity=".6" strokeWidth="1.3" />
                  <WaxSeal uid="ceiSeal" at={SEAL_AT} scale={SEAL_SCALE} animate={false} depth={3.6} />
                </svg>
                <div className="cei-flap-light cei-flap-shade" />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="cei-shade" />
    </div>
  );
};
