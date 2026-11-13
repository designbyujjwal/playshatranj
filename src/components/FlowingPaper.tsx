import React, { useLayoutEffect, useRef, useState } from 'react';
import { TornOldBookPage } from './TornOldBookPage';

/**
 * Torn court-book paper that grows with its content. The sheet is drawn behind
 * the content at the content's measured size.
 */
export const FlowingPaper: React.FC<{
  id: string;
  children: React.ReactNode;
  padding?: string;
}> = ({ id, children, padding = '62px 78px 58px' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 720, h: 900 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      setSize((s) => (s.w === w && s.h === h ? s : { w, h }));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div id={id} className="relative w-full select-none">
      <div className="absolute left-0 top-0 pointer-events-none" aria-hidden="true">
        <TornOldBookPage
          id={`${id}-paper`}
          side="left"
          fixed
          scale={1}
          width={size.w}
          height={size.h}
        >
          {null}
        </TornOldBookPage>
      </div>
      <div ref={ref} className="relative z-10 w-full" style={{ padding }}>
        {children}
      </div>
    </div>
  );
};

/** Hand-inked commander portrait (no network image needed). */
export const CommanderPortrait: React.FC<{ color?: 'w' | 'b'; className?: string }> = ({
  color = 'w',
  className = '',
}) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  // A seal: the king of the player's own colour on a burgundy (White) or ebony (Black) ground, rimmed in gold
  const white = color === 'w';
  const piece = white ? '#f6ead0' : '#e2b95c';
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Commander portrait">
      <defs>
        <radialGradient id={`pg${uid}`} cx="50%" cy="38%" r="72%">
          <stop offset="0%" stopColor={white ? '#a52c34' : '#4a2f18'} />
          <stop offset="100%" stopColor={white ? '#5a1118' : '#140a04'} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#pg${uid})`} />
      <g fill={piece}>
        <rect x="48" y="13" width="4" height="15" rx="1" />
        <rect x="43" y="17.5" width="14" height="4" rx="1" />
        <path d="M37 46 C31 35 42 27 50 34 C58 27 69 35 63 46 L60 59 H40 Z" />
        <rect x="36" y="60" width="28" height="5" rx="2.5" />
        <path d="M40 66 C40 73 36 77 33 80 H67 C64 77 60 73 60 66 Z" />
        <rect x="29" y="81" width="42" height="7" rx="3.5" />
      </g>
      <circle cx="50" cy="50" r="46.5" fill="none" stroke="#c9962e" strokeWidth="3" />
      <circle cx="50" cy="50" r="42.5" fill="none" stroke="#e9cf8a" strokeWidth="0.6" opacity="0.7" />
    </svg>
  );
};
