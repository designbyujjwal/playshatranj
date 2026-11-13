#!/usr/bin/env python3
import math

def generate_coin_svg():
    cx, cy = 200, 200
    r_outer = 194
    r_beads = 181
    r_inner_rim = 171
    r_field = 164

    # 1. Beaded pearls
    num_beads = 82
    beads = []
    for i in range(num_beads):
        angle = (2 * math.pi * i) / num_beads
        bx = cx + r_beads * math.cos(angle)
        by = cy + r_beads * math.sin(angle)
        beads.append(f'<circle cx="{bx:.2f}" cy="{by:.2f}" r="3.2" fill="url(#bronzeBeadGrad)" stroke="#221507" stroke-width="0.6" />')
    beads_str = "\n    ".join(beads)

    # 2. Vitruvian wave along bottom arc
    # Arc from angle 45 deg to 135 deg (bottom)
    # in radians: angle from ~0.75 rad (43 deg) to 2.39 rad (137 deg)
    num_waves = 12
    waves = []
    r_wave = 142
    start_deg = 36
    end_deg = 144
    step_deg = (end_deg - start_deg) / num_waves
    for i in range(num_waves):
        mid_deg = start_deg + i * step_deg + step_deg / 2
        mid_rad = math.radians(mid_deg)
        wx = cx + r_wave * math.cos(mid_rad)
        wy = cy + r_wave * math.sin(mid_rad)
        tangent_deg = mid_deg + 90
        # Draw a curly wave scroll
        waves.append(f'''<g transform="translate({wx:.1f}, {wy:.1f}) rotate({tangent_deg:.1f})">
          <path d="M -10,0 C -5,-8 3,-8 5,-2 C 6,3 1,6 -3,4 C -6,2 -5,-3 -2,-3 C 1,-3 2,-1 1,1" fill="none" stroke="#251608" stroke-width="3" stroke-linecap="round" />
          <path d="M -10,0 C -5,-8 3,-8 5,-2 C 6,3 1,6 -3,4 C -6,2 -5,-3 -2,-3 C 1,-3 2,-1 1,1" fill="none" stroke="url(#bronzeHighlightGrad)" stroke-width="1.6" stroke-linecap="round" />
        </g>''')
    waves_str = "\n    ".join(waves)

    # 3. Left and Right Laurel Sprigs
    laurel_left = []
    num_leaves = 6
    for i in range(num_leaves):
        t = i / (num_leaves - 1)
        deg = 205 - t * 40  # 205 deg down to 165 deg
        rad = math.radians(deg)
        lx = cx + 138 * math.cos(rad)
        ly = cy + 138 * math.sin(rad)
        rot = deg - 90
        laurel_left.append(f'''<g transform="translate({lx:.1f}, {ly:.1f}) rotate({rot:.1f})">
          <path d="M 0,0 C -5,-6 -8,-14 0,-20 C 8,-14 5,-6 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#221508" stroke-width="1" />
          <path d="M 0,0 C -2,-5 -4,-12 0,-17" fill="none" stroke="#f1d691" stroke-width="0.8" opacity="0.8" />
          <path d="M 0,-5 C 5,-9 11,-12 14,-7 C 14,-2 7,0 0,-5 Z" fill="url(#bronzeReliefGrad)" stroke="#221508" stroke-width="0.8" />
          <path d="M 0,-5 C -5,-9 -11,-12 -14,-7 C -14,-2 -7,0 0,-5 Z" fill="url(#bronzeReliefGrad)" stroke="#221508" stroke-width="0.8" />
        </g>''')
    laurel_left_str = "\n    ".join(laurel_left)

    laurel_right = []
    for i in range(num_leaves):
        t = i / (num_leaves - 1)
        deg = -25 + t * 40  # -25 deg to 15 deg
        rad = math.radians(deg)
        lx = cx + 138 * math.cos(rad)
        ly = cy + 138 * math.sin(rad)
        rot = deg + 90
        laurel_right.append(f'''<g transform="translate({lx:.1f}, {ly:.1f}) rotate({rot:.1f})">
          <path d="M 0,0 C -5,-6 -8,-14 0,-20 C 8,-14 5,-6 0,0 Z" fill="url(#bronzeReliefGrad)" stroke="#221508" stroke-width="1" />
          <path d="M 0,0 C -2,-5 -4,-12 0,-17" fill="none" stroke="#f1d691" stroke-width="0.8" opacity="0.8" />
          <path d="M 0,-5 C 5,-9 11,-12 14,-7 C 14,-2 7,0 0,-5 Z" fill="url(#bronzeReliefGrad)" stroke="#221508" stroke-width="0.8" />
          <path d="M 0,-5 C -5,-9 -11,-12 -14,-7 C -14,-2 -7,0 0,-5 Z" fill="url(#bronzeReliefGrad)" stroke="#221508" stroke-width="0.8" />
        </g>''')
    laurel_right_str = "\n    ".join(laurel_right)

    print("Components computed.")
    return beads_str, waves_str, laurel_left_str, laurel_right_str

generate_coin_svg()
