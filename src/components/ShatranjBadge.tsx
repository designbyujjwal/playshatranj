import React from 'react';

interface ShatranjBadgeProps {
  size?: number | string;
  className?: string;
  id?: string;
}

export const ShatranjBadge: React.FC<ShatranjBadgeProps> = ({
  size = 52,
  className = '',
  id = 'shatranj-badge',
}) => {
  return (
    <svg
      id={id}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none overflow-visible ${className}`}
    >
      <defs>
        {/* Soft realistic drop shadow for the squircle badge */}
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.85" />
        </filter>

        {/* Outer rich metallic gold rim gradient */}
        <linearGradient id={`${id}-gold-rim`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fae090" />
          <stop offset="25%" stopColor="#e5be5e" />
          <stop offset="70%" stopColor="#b58731" />
          <stop offset="100%" stopColor="#8d601b" />
        </linearGradient>

        {/* Inner subtle rim highlight bevel */}
        <linearGradient id={`${id}-gold-inner-rim`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff6cc" stopOpacity="0.75" />
          <stop offset="40%" stopColor="#d8a846" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4a2a04" stopOpacity="0.75" />
        </linearGradient>

        {/* Interior deep crimson oxblood gradient */}
        <radialGradient id={`${id}-bg-grad`} cx="50%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#8a0c12" />
          <stop offset="42%" stopColor="#630409" />
          <stop offset="78%" stopColor="#380104" />
          <stop offset="100%" stopColor="#1a0002" />
        </radialGradient>

        {/* Knight silhouette warm peach/terracotta tan bronze gradient */}
        <linearGradient id={`${id}-knight-grad`} x1="20%" y1="15%" x2="80%" y2="85%">
          <stop offset="0%" stopColor="#dc9c7c" />
          <stop offset="40%" stopColor="#c78665" />
          <stop offset="80%" stopColor="#b17251" />
          <stop offset="100%" stopColor="#9a5e3f" />
        </linearGradient>

        {/* Knight subtle edge drop shadow for embedded depth */}
        <filter id={`${id}-knight-shadow`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1" floodColor="#180002" floodOpacity="0.85" />
        </filter>
      </defs>

      <g filter={`url(#${id}-shadow)`}>
        {/* Outer squircle gold border */}
        <rect
          x="3.5"
          y="3.5"
          width="93"
          height="93"
          rx="19"
          ry="19"
          fill="none"
          stroke={`url(#${id}-gold-rim)`}
          strokeWidth="3.6"
        />

        {/* Badge interior crimson background */}
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="17.2"
          ry="17.2"
          fill={`url(#${id}-bg-grad)`}
        />

        {/* Inner fine bevel line */}
        <rect
          x="6.2"
          y="6.2"
          width="87.6"
          height="87.6"
          rx="16"
          ry="16"
          fill="none"
          stroke={`url(#${id}-gold-inner-rim)`}
          strokeWidth="0.9"
        />

        {/* =====================================================================
            CHESS KNIGHT SILHOUETTE
            Exact replica of user reference:
            - Pedestal: Horizontal rectangle at bottom [34.5 to 85.5]
            - Neck / Crest: Smooth convex arch from base to apex
            - Ear: Pointed ear angled slightly backward
            - Forehead notch -> Slanted muzzle bridge
            - Angled snout tip -> Under-jaw line
            - Smooth concave throat swoop curving into neck waist and flaring to base
           ===================================================================== */}
        <g filter={`url(#${id}-knight-shadow)`}>
          {/* Rectangular Pedestal Base */}
          <rect
            x="34.5"
            y="69.5"
            width="51"
            height="11"
            rx="0.5"
            fill={`url(#${id}-knight-grad)`}
          />

          {/* Knight Head and Neck Silhouette */}
          <path
            d="
              M 82.5,69.5
              C 82.5,46 74,23.5 44,22.5
              L 40.5,23
              L 33,18
              L 36.5,26.5
              L 30.5,31
              L 20,52
              L 26.5,58.5
              L 38.5,47
              C 55,48 53,62 39,69.5
              Z
            "
            fill={`url(#${id}-knight-grad)`}
          />
        </g>
      </g>
    </svg>
  );
};

export default ShatranjBadge;
