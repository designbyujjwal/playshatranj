import React from 'react';

interface ChampionStampMarkProps {
  className?: string;
  isDraw?: boolean;
}

/**
 * Authentic 16th-Century Royal Champion Wax Seal
 * Built on the exact identical physical wax seal architecture from TornOldBookPage WaxSeal:
 *  - Hand-poured organic melted wax blob contour (BLOB)
 *  - Multi-layer paper contact shadow with Gaussian blur
 *  - Thick rolled wax edge with feTurbulence displacement and directional bevels
 *  - Recessed pressed circular disc face
 *  - Double concentric coin-edge rings
 *  - Botanical Roman victor laurel wreath vine with 28 circular rotating leaves
 *  - Authentic Blackletter Gothic "C" for Champion (crowned with Imperial Chess Coronet)
 *  - Inscribed "CHAMPION" lower relief banner and royal 5-point star
 *  - 3D Diffuse & Specular lighting height-map pipeline
 *  - Physical waxStamp stamping drop animation
 */
export const ChampionStampMark: React.FC<ChampionStampMarkProps> = ({
  className = '',
  isDraw = false,
}) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');

  const body = `champ-wax-body-${uid}`;
  const field = `champ-wax-field-${uid}`;
  const rough = `champ-wax-rough-${uid}`;
  const soft = `champ-wax-soft-${uid}`;
  const shadow = `champ-wax-shadow-${uid}`;
  const grainId = `champ-wax-grain-${uid}`;
  const diffId = `champ-wax-diff-${uid}`;
  const specId = `champ-wax-spec-${uid}`;

  // Organic melted wax blob contour (identical to TornOldBookPage)
  const BLOB =
    'M 48.5,0.0 L 47.6,1.7 L 46.3,3.2 L 45.1,4.7 L 44.1,6.2 L 43.6,7.7 L 43.3,9.2 L 43.1,10.8 L 42.8,12.3 L 42.1,13.7 L 41.3,15.0 L 40.4,16.3 L 39.7,17.7 L 39.2,19.1 L 38.8,20.6 L 38.3,22.1 L 37.7,23.6 L 36.9,24.9 L 36.1,26.2 L 35.5,27.7 L 35.1,29.4 L 34.9,31.4 L 34.6,33.4 L 34.0,35.2 L 32.9,36.6 L 31.4,37.5 L 29.7,38.0 L 27.8,38.3 L 26.0,38.6 L 24.3,39.0 L 22.7,39.3 L 21.1,39.6 L 19.4,39.7 L 17.7,39.7 L 16.1,39.8 L 14.6,40.2 L 13.3,41.0 L 12.0,42.0 L 10.7,43.0 L 9.3,43.8 L 7.8,44.2 L 6.2,44.2 L 4.6,44.2 L 3.1,44.3 L 1.6,44.8 L 0.0,45.6 L -1.6,46.4 L -3.3,47.0 L -5.0,47.3 L -6.7,47.3 L -8.3,47.2 L -10.0,46.9 L -11.6,46.7 L -13.3,46.3 L -14.8,45.5 L -16.1,44.2 L -17.2,42.6 L -18.1,40.7 L -19.0,39.0 L -20.0,37.6 L -21.2,36.8 L -22.7,36.3 L -24.2,35.8 L -25.6,35.3 L -27.0,34.6 L -28.3,33.7 L -29.6,32.9 L -31.1,32.2 L -32.6,31.5 L -34.2,30.8 L -35.6,29.8 L -36.7,28.7 L -37.6,27.3 L -38.4,25.9 L -39.4,24.6 L -40.5,23.4 L -41.9,22.3 L -43.2,21.1 L -44.3,19.7 L -44.7,18.1 L -44.7,16.3 L -44.3,14.4 L -43.8,12.6 L -43.4,10.8 L -43.2,9.2 L -43.0,7.6 L -42.8,6.0 L -42.5,4.5 L -42.2,3.0 L -42.2,1.5 L -42.5,0.0 L -43.4,-1.5 L -44.4,-3.1 L -45.4,-4.8 L -46.0,-6.5 L -46.1,-8.1 L -45.7,-9.7 L -45.2,-11.3 L -44.7,-12.8 L -44.4,-14.4 L -44.2,-16.1 L -44.0,-17.8 L -43.4,-19.3 L -42.6,-20.8 L -41.6,-22.1 L -40.5,-23.4 L -39.5,-24.7 L -38.5,-26.0 L -37.5,-27.2 L -36.2,-28.3 L -34.6,-29.0 L -32.8,-29.5 L -30.9,-29.8 L -29.3,-30.3 L -28.0,-31.1 L -27.1,-32.2 L -26.4,-33.7 L -25.7,-35.3 L -24.9,-36.8 L -23.9,-38.2 L -22.8,-39.5 L -21.7,-40.8 L -20.5,-42.1 L -19.3,-43.4 L -18.0,-44.6 L -16.5,-45.3 L -14.8,-45.6 L -13.0,-45.5 L -11.3,-45.3 L -9.6,-45.2 L -8.0,-45.4 L -6.4,-45.9 L -4.9,-46.3 L -3.2,-46.4 L -1.6,-46.1 L -0.0,-45.4 L 1.6,-44.6 L 3.1,-43.8 L 4.5,-43.2 L 6.0,-42.8 L 7.5,-42.5 L 8.9,-42.1 L 10.4,-41.6 L 11.8,-41.2 L 13.3,-41.0 L 15.0,-41.3 L 16.9,-41.8 L 18.9,-42.4 L 20.9,-42.8 L 22.7,-42.7 L 24.3,-42.0 L 25.6,-40.9 L 26.7,-39.6 L 27.8,-38.3 L 29.0,-37.1 L 30.2,-36.0 L 31.3,-34.7 L 32.1,-33.3 L 32.8,-31.7 L 33.5,-30.1 L 34.1,-28.6 L 35.0,-27.3 L 36.0,-26.2 L 37.0,-25.0 L 37.8,-23.6 L 38.3,-22.1 L 38.4,-20.4 L 38.6,-18.8 L 38.9,-17.3 L 39.6,-16.0 L 40.8,-14.9 L 42.2,-13.7 L 43.7,-12.5 L 44.9,-11.2 L 45.8,-9.7 L 46.6,-8.2 L 47.3,-6.7 L 48.0,-5.0 L 48.6,-3.4 L 48.8,-1.7 Z';

  // Authentic Laurel Victor Wreath Vine Paths (identical to TornOldBookPage WaxSeal)
  const VINE_A =
    'M 31.0,0.0 L 31.2,0.3 L 31.4,0.5 L 31.6,0.8 L 31.7,1.1 L 31.9,1.4 L 32.0,1.7 L 32.1,2.0 L 32.2,2.3 L 32.3,2.5 L 32.4,2.8 L 32.4,3.1 L 32.4,3.4 L 32.4,3.7 L 32.3,4.0 L 32.3,4.2 L 32.2,4.5 L 32.0,4.8 L 31.9,5.1 L 31.7,5.3 L 31.5,5.6 L 31.3,5.8 L 31.1,6.0 L 30.9,6.3 L 30.6,6.5 L 30.4,6.7 L 30.2,7.0 L 29.9,7.2 L 29.7,7.4 L 29.4,7.6 L 29.2,7.8 L 28.9,8.0 L 28.7,8.2 L 28.5,8.5 L 28.3,8.7 L 28.2,8.9 L 28.0,9.1 L 27.9,9.3 L 27.8,9.6 L 27.7,9.8 L 27.6,10.1 L 27.6,10.3 L 27.6,10.6 L 27.6,10.9 L 27.6,11.1 L 27.6,11.4 L 27.6,11.7 L 27.7,12.0 L 27.7,12.3 L 27.8,12.7 L 27.8,13.0 L 27.9,13.3 L 28.0,13.6 L 28.0,14.0 L 28.1,14.3 L 28.1,14.6 L 28.1,15.0 L 28.1,15.3 L 28.1,15.6 L 28.1,15.9 L 28.0,16.2 L 28.0,16.5 L 27.9,16.8 L 27.8,17.0 L 27.6,17.3 L 27.5,17.5 L 27.3,17.7 L 27.1,17.9 L 26.9,18.1 L 26.7,18.3 L 26.4,18.5 L 26.1,18.6 L 25.8,18.8 L 25.5,18.9 L 25.2,19.0 L 24.9,19.1 L 24.6,19.2 L 24.3,19.3 L 24.0,19.4 L 23.6,19.5 L 23.3,19.6 L 23.0,19.7 L 22.7,19.8 L 22.4,19.8 L 22.2,19.9 L 21.9,20.1 L 21.6,20.2 L 21.4,20.3 L 21.2,20.5 L 21.0,20.6 L 20.8,20.8 L 20.6,21.0 L 20.5,21.2 L 20.3,21.4 L 20.2,21.6 L 20.1,21.9 L 19.9,22.2 L 19.8,22.4 L 19.8,22.7 L 19.7,23.0 L 19.6,23.3 L 19.5,23.6 L 19.4,24.0 L 19.3,24.3 L 19.2,24.6 L 19.1,24.9 L 19.0,25.2 L 18.9,25.5 L 18.8,25.8 L 18.6,26.1 L 18.5,26.4 L 18.3,26.7 L 18.1,26.9 L 17.9,27.1 L 17.7,27.3 L 17.5,27.5 L 17.3,27.6 L 17.0,27.8 L 16.8,27.9 L 16.5,28.0 L 16.2,28.0 L 15.9,28.1 L 15.6,28.1 L 15.3,28.1 L 15.0,28.1 L 14.6,28.1 L 14.3,28.1 L 14.0,28.0 L 13.6,28.0 L 13.3,27.9 L 13.0,27.8 L 12.7,27.8 L 12.3,27.7 L 12.0,27.7 L 11.7,27.6 L 11.4,27.6 L 11.1,27.6 L 10.9,27.6 L 10.6,27.6 L 10.3,27.6 L 10.1,27.6 L 9.8,27.7 L 9.6,27.8 L 9.3,27.9 L 9.1,28.0 L 8.9,28.2 L 8.7,28.3 L 8.5,28.5 L 8.2,28.7 L 8.0,28.9 L 7.8,29.2 L 7.6,29.4 L 7.4,29.7 L 7.2,29.9 L 7.0,30.2 L 6.7,30.4 L 6.5,30.6 L 6.3,30.9 L 6.0,31.1 L 5.8,31.3 L 5.6,31.5 L 5.3,31.7 L 5.1,31.9 L 4.8,32.0 L 4.5,32.2 L 4.2,32.3 L 4.0,32.3 L 3.7,32.4 L 3.4,32.4 L 3.1,32.4 L 2.8,32.4 L 2.5,32.3 L 2.3,32.2 L 2.0,32.1 L 1.7,32.0 L 1.4,31.9 L 1.1,31.7 L 0.8,31.6 L 0.5,31.4 L 0.3,31.2 L 0.0,31.0 L -0.3,30.8 L -0.5,30.6 L -0.8,30.4 L -1.1,30.2 L -1.3,30.1 L -1.6,29.9 L -1.8,29.7 L -2.1,29.6 L -2.3,29.5 L -2.6,29.4 L -2.8,29.3 L -3.1,29.2 L -3.3,29.2 L -3.6,29.2 L -3.8,29.2 L -4.1,29.2 L -4.4,29.3 L -4.6,29.3 L -4.9,29.4 L -5.2,29.5 L -5.5,29.6 L -5.8,29.7 L -6.1,29.9 L -6.4,30.0 L -6.7,30.1 L -7.0,30.3 L -7.3,30.4 L -7.6,30.5 L -7.9,30.6 L -8.2,30.7 L -8.5,30.8 L -8.9,30.9 L -9.2,30.9 L -9.5,30.9 L -9.8,30.9 L -10.0,30.9 L -10.3,30.9 L -10.6,30.8 L -10.9,30.7 L -11.1,30.6 L -11.4,30.5 L -11.6,30.3 L -11.9,30.1 L -12.1,29.9 L -12.3,29.7 L -12.5,29.4 L -12.7,29.2 L -12.9,28.9 L -13.0,28.6 L -13.2,28.3 L -13.4,28.1 L -13.5,27.8 L -13.7,27.5 L -13.8,27.2 L -14.0,26.9 L -14.2,26.6 L -14.3,26.4 L -14.5,26.1 L -14.6,25.9 L -14.8,25.6 L -15.0,25.4 L -15.2,25.3 L -15.4,25.1 L -15.6,24.9 L -15.8,24.8 L -16.0,24.7 L -16.3,24.6 L -16.5,24.5 L -16.8,24.4 L -17.1,24.4 L -17.4,24.3 L -17.7,24.3 L -18.0,24.3 L -18.3,24.3 L -18.6,24.3 L -18.9,24.3 L -19.3,24.2 L -19.6,24.2 L -19.9,24.2 L -20.3,24.2 L -20.6,24.1 L -20.9,24.1 L -21.2,24.0 L -21.5,23.9 L -21.8,23.8 L -22.1,23.7 L -22.4,23.6 L -22.6,23.4 L -22.8,23.2 L -23.1,23.1 L -23.2,22.8 L -23.4,22.6 L -23.6,22.4 L -23.7,22.1 L -23.8,21.8 L -23.9,21.5 L -24.0,21.2 L -24.1,20.9 L -24.1,20.6 L -24.2,20.3 L -24.2,19.9 L -24.2,19.6 L -24.2,19.3 L -24.3,18.9 L -24.3,18.6 L -24.3,18.3 L -24.3,18.0 L -24.3,17.7 L -24.3,17.4 L -24.4,17.1 L -24.4,16.8 L -24.5,16.5 L -24.6,16.3 L -24.7,16.0 L -24.8,15.8 L -24.9,15.6 L -25.1,15.4 L -25.3,15.2 L -25.4,15.0 L -25.6,14.8 L -25.9,14.6 L -26.1,14.5 L -26.4,14.3 L -26.6,14.2 L -26.9,14.0 L -27.2,13.8 L -27.5,13.7 L -27.8,13.5 L -28.1,13.4 L -28.3,13.2 L -28.6,13.0 L -28.9,12.9 L -29.2,12.7 L -29.4,12.5 L -29.7,12.3 L -29.9,12.1 L -30.1,11.9 L -30.3,11.6 L -30.5,11.4 L -30.6,11.1 L -30.7,10.9 L -30.8,10.6 L -30.9,10.3 L -30.9,10.0 L -30.9,9.8 L -30.9,9.5 L -30.9,9.2 L -30.9,8.9 L -30.8,8.5 L -30.7,8.2 L -30.6,7.9 L -30.5,7.6 L -30.4,7.3 L -30.3,7.0 L -30.1,6.7 L -30.0,6.4 L -29.9,6.1 L -29.7,5.8 L -29.6,5.5 L -29.5,5.2 L -29.4,4.9 L -29.3,4.6 L -29.3,4.4 L -29.2,4.1 L -29.2,3.8 L -29.2,3.6 L -29.2,3.3 L -29.2,3.1 L -29.3,2.8 L -29.4,2.6 L -29.5,2.3 L -29.6,2.1 L -29.7,1.8 L -29.9,1.6 L -30.1,1.3 L -30.2,1.1 L -30.4,0.8 L -30.6,0.5 L -30.8,0.3 L -31.0,0.0 L -31.2,-0.3 L -31.4,-0.5 L -31.6,-0.8 L -31.7,-1.1 L -31.9,-1.4 L -32.0,-1.7 L -32.1,-2.0 L -32.2,-2.3 L -32.3,-2.5 L -32.4,-2.8 L -32.4,-3.1 L -32.4,-3.4 L -32.4,-3.7 L -32.3,-4.0 L -32.3,-4.2 L -32.2,-4.5 L -32.0,-4.8 L -31.9,-5.1 L -31.7,-5.3 L -31.5,-5.6 L -31.3,-5.8 L -31.1,-6.0 L -30.9,-6.3 L -30.6,-6.5 L -30.4,-6.7 L -30.2,-7.0 L -29.9,-7.2 L -29.7,-7.4 L -29.4,-7.6 L -29.2,-7.8 L -28.9,-8.0 L -28.7,-8.2 L -28.5,-8.5 L -28.3,-8.7 L -28.2,-8.9 L -28.0,-9.1 L -27.9,-9.3 L -27.8,-9.6 L -27.7,-9.8 L -27.6,-10.1 L -27.6,-10.3 L -27.6,-10.6 L -27.6,-10.9 L -27.6,-11.1 L -27.6,-11.4 L -27.6,-11.7 L -27.7,-12.0 L -27.7,-12.3 L -27.8,-12.7 L -27.8,-13.0 L -27.9,-13.3 L -28.0,-13.6 L -28.0,-14.0 L -28.1,-14.3 L -28.1,-14.6 L -28.1,-15.0 L -28.1,-15.3 L -28.1,-15.6 L -28.1,-15.9 L -28.0,-16.2 L -28.0,-16.5 L -27.9,-16.8 L -27.8,-17.0 L -27.6,-17.3 L -27.5,-17.5 L -27.3,-17.7 L -27.1,-17.9 L -26.9,-18.1 L -26.7,-18.3 L -26.4,-18.5 L -26.1,-18.6 L -25.8,-18.8 L -25.5,-18.9 L -25.2,-19.0 L -24.9,-19.1 L -24.6,-19.2 L -24.3,-19.3 L -24.0,-19.4 L -23.6,-19.5 L -23.3,-19.6 L -23.0,-19.7 L -22.7,-19.8 L -22.4,-19.8 L -22.2,-19.9 L -21.9,-20.1 L -21.6,-20.2 L -21.4,-20.3 L -21.2,-20.5 L -21.0,-20.6 L -20.8,-20.8 L -20.6,-21.0 L -20.5,-21.2 L -20.3,-21.4 L -20.2,-21.6 L -20.1,-21.9 L -19.9,-22.2 L -19.8,-22.4 L -19.8,-22.7 L -19.7,-23.0 L -19.6,-23.3 L -19.5,-23.6 L -19.4,-24.0 L -19.3,-24.3 L -19.2,-24.6 L -19.1,-24.9 L -19.0,-25.2 L -18.9,-25.5 L -18.8,-25.8 L -18.6,-26.1 L -18.5,-26.4 L -18.3,-26.7 L -18.1,-26.9 L -17.9,-27.1 L -17.7,-27.3 L -17.5,-27.5 L -17.3,-27.6 L -17.0,-27.8 L -16.8,-27.9 L -16.5,-28.0 L -16.2,-28.0 L -15.9,-28.1 L -15.6,-28.1 L -15.3,-28.1 L -15.0,-28.1 L -14.6,-28.1 L -14.3,-28.1 L -14.0,-28.0 L -13.6,-28.0 L -13.3,-27.9 L -13.0,-27.8 L -12.7,-27.8 L -12.3,-27.7 L -12.0,-27.7 L -11.7,-27.6 L -11.4,-27.6 L -11.1,-27.6 L -10.9,-27.6 L -10.6,-27.6 L -10.3,-27.6 L -10.1,-27.6 L -9.8,-27.7 L -9.6,-27.8 L -9.3,-27.9 L -9.1,-28.0 L -8.9,-28.2 L -8.7,-28.3 L -8.5,-28.5 L -8.2,-28.7 L -8.0,-28.9 L -7.8,-29.2 L -7.6,-29.4 L -7.4,-29.7 L -7.2,-29.9 L -7.0,-30.2 L -6.7,-30.4 L -6.5,-30.6 L -6.3,-30.9 L -6.0,-31.1 L -5.8,-31.3 L -5.6,-31.5 L -5.3,-31.7 L -5.1,-31.9 L -4.8,-32.0 L -4.5,-32.2 L -4.2,-32.3 L -4.0,-32.3 L -3.7,-32.4 L -3.4,-32.4 L -3.1,-32.4 L -2.8,-32.4 L -2.5,-32.3 L -2.3,-32.2 L -2.0,-32.1 L -1.7,-32.0 L -1.4,-31.9 L -1.1,-31.7 L -0.8,-31.6 L -0.5,-31.4 L -0.3,-31.2 L -0.0,-31.0 L 0.3,-30.8 L 0.5,-30.6 L 0.8,-30.4 L 1.1,-30.2 L 1.3,-30.1 L 1.6,-29.9 L 1.8,-29.7 L 2.1,-29.6 L 2.3,-29.5 L 2.6,-29.4 L 2.8,-29.3 L 3.1,-29.2 L 3.3,-29.2 L 3.6,-29.2 L 3.8,-29.2 L 4.1,-29.2 L 4.4,-29.3 L 4.6,-29.3 L 4.9,-29.4 L 5.2,-29.5 L 5.5,-29.6 L 5.8,-29.7 L 6.1,-29.9 L 6.4,-30.0 L 6.7,-30.1 L 7.0,-30.3 L 7.3,-30.4 L 7.6,-30.5 L 7.9,-30.6 L 8.2,-30.7 L 8.5,-30.8 L 8.9,-30.9 L 9.2,-30.9 L 9.5,-30.9 L 9.8,-30.9 L 10.0,-30.9 L 10.3,-30.9 L 10.6,-30.8 L 10.9,-30.7 L 11.1,-30.6 L 11.4,-30.5 L 11.6,-30.3 L 11.9,-30.1 L 12.1,-29.9 L 12.3,-29.7 L 12.5,-29.4 L 12.7,-29.2 L 12.9,-28.9 L 13.0,-28.6 L 13.2,-28.3 L 13.4,-28.1 L 13.5,-27.8 L 13.7,-27.5 L 13.8,-27.2 L 14.0,-26.9 L 14.2,-26.6 L 14.3,-26.4 L 14.5,-26.1 L 14.6,-25.9 L 14.8,-25.6 L 15.0,-25.4 L 15.2,-25.3 L 15.4,-25.1 L 15.6,-24.9 L 15.8,-24.8 L 16.0,-24.7 L 16.3,-24.6 L 16.5,-24.5 L 16.8,-24.4 L 17.1,-24.4 L 17.4,-24.3 L 17.7,-24.3 L 18.0,-24.3 L 18.3,-24.3 L 18.6,-24.3 L 18.9,-24.3 L 19.3,-24.2 L 19.6,-24.2 L 19.9,-24.2 L 20.3,-24.2 L 20.6,-24.1 L 20.9,-24.1 L 21.2,-24.0 L 21.5,-23.9 L 21.8,-23.8 L 22.1,-23.7 L 22.4,-23.6 L 22.6,-23.4 L 22.8,-23.2 L 23.1,-23.1 L 23.2,-22.8 L 23.4,-22.6 L 23.6,-22.4 L 23.7,-22.1 L 23.8,-21.8 L 23.9,-21.5 L 24.0,-21.2 L 24.1,-20.9 L 24.1,-20.6 L 24.2,-20.3 L 24.2,-19.9 L 24.2,-19.6 L 24.2,-19.3 L 24.3,-18.9 L 24.3,-18.6 L 24.3,-18.3 L 24.3,-18.0 L 24.3,-17.7 L 24.3,-17.4 L 24.4,-17.1 L 24.4,-16.8 L 24.5,-16.5 L 24.6,-16.3 L 24.7,-16.0 L 24.8,-15.8 L 24.9,-15.6 L 25.1,-15.4 L 25.3,-15.2 L 25.4,-15.0 L 25.6,-14.8 L 25.9,-14.6 L 26.1,-14.5 L 26.4,-14.3 L 26.6,-14.2 L 26.9,-14.0 L 27.2,-13.8 L 27.5,-13.7 L 27.8,-13.5 L 28.1,-13.4 L 28.3,-13.2 L 28.6,-13.0 L 28.9,-12.9 L 29.2,-12.7 L 29.4,-12.5 L 29.7,-12.3 L 29.9,-12.1 L 30.1,-11.9 L 30.3,-11.6 L 30.5,-11.4 L 30.6,-11.1 L 30.7,-10.9 L 30.8,-10.6 L 30.9,-10.3 L 30.9,-10.0 L 30.9,-9.8 L 30.9,-9.5 L 30.9,-9.2 L 30.9,-8.9 L 30.8,-8.5 L 30.7,-8.2 L 30.6,-7.9 L 30.5,-7.6 L 30.4,-7.3 L 30.3,-7.0 L 30.1,-6.7 L 30.0,-6.4 L 29.9,-6.1 L 29.7,-5.8 L 29.6,-5.5 L 29.5,-5.2 L 29.4,-4.9 L 29.3,-4.6 L 29.3,-4.4 L 29.2,-4.1 L 29.2,-3.8 L 29.2,-3.6 L 29.2,-3.3 L 29.2,-3.1 L 29.3,-2.8 L 29.4,-2.6 L 29.5,-2.3 L 29.6,-2.1 L 29.7,-1.8 L 29.9,-1.6 L 30.1,-1.3 L 30.2,-1.1 L 30.4,-0.8 L 30.6,-0.5 L 30.8,-0.3 L 31.0,-0.0 Z';

  const VINE_B =
    'M 32.4,3.7 L 32.8,2.8 L 33.4,2.0 L 34.1,1.6 L 35.0,1.4 L 35.8,1.5 L 36.5,1.9 L 37.1,2.4 L 37.4,3.1 L 37.4,3.8 L 37.3,4.5 L 37.0,5.0 L 36.5,5.4 L 36.0,5.6 L 35.4,5.6 L 34.9,5.4 L 34.6,5.1 L 34.3,4.7 L 34.3,4.3 L 34.3,3.9 L 34.5,3.6 L 34.7,3.4 L 35.0,3.3 L 35.2,3.3 L 35.4,3.4 L 35.6,3.6 M 27.8,9.7 L 27.2,10.5 L 26.5,11.1 L 25.6,11.3 L 24.7,11.3 L 24.0,11.0 L 23.3,10.5 L 22.9,9.9 L 22.8,9.1 L 22.9,8.4 L 23.1,7.8 L 23.6,7.4 L 24.1,7.1 L 24.7,7.1 L 25.2,7.2 L 25.7,7.4 L 25.9,7.8 L 26.1,8.2 L 26.1,8.6 L 25.9,9.0 L 25.7,9.3 L 25.4,9.4 L 25.2,9.4 L 24.9,9.4 L 24.7,9.2 L 24.6,9.1 M 27.6,17.3 L 27.3,18.3 L 27.4,19.2 L 27.7,20.0 L 28.2,20.7 L 29.0,21.1 L 29.7,21.3 L 30.5,21.2 L 31.2,20.9 L 31.6,20.4 L 31.9,19.8 L 32.0,19.1 L 31.9,18.6 L 31.6,18.1 L 31.2,17.7 L 30.7,17.6 L 30.2,17.6 L 29.8,17.7 L 29.5,18.0 L 29.3,18.3 L 29.2,18.6 L 29.3,19.0 L 29.4,19.2 L 29.6,19.3 L 29.8,19.4 L 30.0,19.4 M 20.8,20.8 L 21.3,20.0 L 21.4,19.0 L 21.3,18.1 L 20.9,17.4 L 20.3,16.8 L 19.6,16.5 L 18.8,16.4 L 18.1,16.6 L 17.5,16.9 L 17.1,17.5 L 16.9,18.1 L 16.9,18.7 L 17.1,19.2 L 17.4,19.6 L 17.8,19.9 L 18.3,20.0 L 18.7,19.9 L 19.1,19.7 L 19.4,19.5 L 19.5,19.2 L 19.5,18.8 L 19.4,18.6 L 19.3,18.4 L 19.1,18.3 L 18.9,18.3 M 17.3,27.6 L 18.3,27.3 L 19.2,27.4 L 20.0,27.7 L 20.7,28.2 L 21.1,29.0 L 21.3,29.7 L 21.2,30.5 L 20.9,31.2 L 20.4,31.6 L 19.8,31.9 L 19.1,32.0 L 18.6,31.9 L 18.1,31.6 L 17.7,31.2 L 17.6,30.7 L 17.6,30.2 L 17.7,29.8 L 18.0,29.5 L 18.3,29.3 L 18.6,29.2 L 19.0,29.3 L 19.2,29.4 L 19.3,29.6 L 19.4,29.8 L 19.4,30.0 M 9.7,27.8 L 8.7,27.8 L 7.8,27.6 L 7.1,27.1 L 6.6,26.4 L 6.3,25.6 L 6.3,24.8 L 6.6,24.1 L 7.1,23.5 L 7.7,23.1 L 8.3,23.0 L 8.9,23.1 L 9.5,23.3 L 9.9,23.7 L 10.1,24.2 L 10.2,24.7 L 10.1,25.2 L 9.8,25.5 L 9.5,25.8 L 9.1,25.9 L 8.8,25.9 L 8.5,25.8 L 8.3,25.6 L 8.2,25.3 L 8.2,25.1 L 8.3,24.9 M 3.7,32.4 L 2.8,32.8 L 2.0,33.4 L 1.6,34.1 L 1.4,35.0 L 1.5,35.8 L 1.9,36.5 L 2.4,37.1 L 3.1,37.4 L 3.8,37.4 L 4.5,37.3 L 5.0,37.0 L 5.4,36.5 L 5.6,36.0 L 5.6,35.4 L 5.4,34.9 L 5.1,34.6 L 4.7,34.3 L 4.3,34.3 L 3.9,34.3 L 3.6,34.5 L 3.4,34.7 L 3.3,35.0 L 3.3,35.2 L 3.4,35.4 L 3.6,35.6 M -3.3,29.2 L -2.3,29.1 L -1.5,28.6 L -0.9,28.0 L -0.5,27.2 L -0.5,26.4 L -0.7,25.6 L -1.1,24.9 L -1.7,24.5 L -2.3,24.3 L -3.0,24.3 L -3.6,24.5 L -4.1,24.8 L -4.4,25.3 L -4.5,25.8 L -4.4,26.3 L -4.2,26.8 L -3.9,27.1 L -3.5,27.2 L -3.2,27.3 L -2.8,27.2 L -2.6,27.0 L -2.4,26.8 L -2.4,26.5 L -2.4,26.3 L -2.5,26.1 M -10.8,30.8 L -10.0,31.3 L -9.4,32.1 L -9.2,32.9 L -9.2,33.8 L -9.5,34.6 L -10.0,35.2 L -10.6,35.6 L -11.3,35.7 L -12.0,35.7 L -12.6,35.4 L -13.1,34.9 L -13.4,34.4 L -13.4,33.8 L -13.3,33.3 L -13.0,32.9 L -12.7,32.6 L -12.2,32.4 L -11.8,32.4 L -11.5,32.6 L -11.2,32.8 L -11.1,33.1 L -11.0,33.4 L -11.1,33.6 L -11.2,33.8 L -11.4,33.9 M -15.6,24.9 L -16.3,24.2 L -16.7,23.3 L -16.7,22.4 L -16.5,21.6 L -16.1,20.9 L -15.4,20.4 L -14.7,20.2 L -14.0,20.2 L -13.3,20.4 L -12.8,20.8 L -12.5,21.4 L -12.3,21.9 L -12.4,22.5 L -12.6,23.0 L -13.0,23.4 L -13.4,23.6 L -13.8,23.6 L -14.2,23.5 L -14.5,23.3 L -14.7,23.0 L -14.8,22.7 L -14.8,22.4 L -14.7,22.2 L -14.5,22.1 L -14.3,22.0 M -23.1,23.1 L -23.9,22.6 L -24.8,22.4 L -25.7,22.5 L -26.5,22.9 L -27.0,23.5 L -27.4,24.3 L -27.5,25.0 L -27.3,25.7 L -26.9,26.3 L -26.4,26.7 L -25.8,26.9 L -25.2,26.9 L -24.6,26.8 L -24.2,26.4 L -24.0,26.0 L -23.9,25.5 L -23.9,25.1 L -24.1,24.7 L -24.4,24.5 L -24.7,24.3 L -25.0,24.3 L -25.3,24.4 L -25.5,24.6 L -25.6,24.8 L -25.6,25.0 M -24.9,15.6 L -24.2,16.3 L -23.3,16.7 L -22.4,16.7 L -21.6,16.5 L -20.9,16.1 L -20.4,15.4 L -20.2,14.7 L -20.2,14.0 L -20.4,13.3 L -20.8,12.8 L -21.4,12.5 L -21.9,12.3 L -22.5,12.4 L -23.0,12.6 L -23.4,13.0 L -23.6,13.4 L -23.6,13.8 L -23.5,14.2 L -23.3,14.5 L -23.0,14.7 L -22.7,14.8 L -22.4,14.8 L -22.2,14.7 L -22.1,14.5 L -22.0,14.3 M -30.8,10.8 L -30.7,11.7 L -30.9,12.6 L -31.4,13.4 L -32.1,13.9 L -32.9,14.2 L -33.7,14.1 L -34.4,13.9 L -35.0,13.4 L -35.4,12.8 L -35.5,12.2 L -35.5,11.5 L -35.2,11.0 L -34.8,10.6 L -34.3,10.4 L -33.8,10.3 L -33.4,10.4 L -33.0,10.7 L -32.7,11.0 L -32.6,11.3 L -32.6,11.7 L -32.8,12.0 L -33.0,12.2 L -33.2,12.3 L -33.4,12.3 L -33.6,12.2 M -29.2,3.3 L -29.1,2.3 L -28.6,1.5 L -28.0,0.9 L -27.2,0.5 L -26.4,0.5 L -25.6,0.7 L -24.9,1.1 L -24.5,1.7 L -24.3,2.3 L -24.3,3.0 L -24.5,3.6 L -24.8,4.1 L -25.3,4.4 L -25.8,4.5 L -26.3,4.4 L -26.8,4.2 L -27.1,3.9 L -27.2,3.5 L -27.3,3.2 L -27.2,2.8 L -27.0,2.6 L -26.8,2.4 L -26.5,2.4 L -26.3,2.4 L -26.1,2.5 M -32.4,-3.7 L -32.5,-4.6 L -33.0,-5.4 L -33.6,-6.0 L -34.4,-6.4 L -35.3,-6.5 L -36.0,-6.3 L -36.7,-5.9 L -37.1,-5.3 L -37.4,-4.6 L -37.4,-4.0 L -37.1,-3.4 L -36.8,-2.9 L -36.3,-2.6 L -35.8,-2.5 L -35.3,-2.5 L -34.8,-2.7 L -34.5,-3.0 L -34.4,-3.4 L -34.3,-3.8 L -34.4,-4.1 L -34.6,-4.4 L -34.8,-4.5 L -35.1,-4.6 L -35.3,-4.5 L -35.5,-4.4 M -27.8,-9.7 L -27.8,-8.7 L -27.6,-7.8 L -27.1,-7.1 L -26.4,-6.6 L -25.6,-6.3 L -24.8,-6.3 L -24.1,-6.6 L -23.5,-7.1 L -23.1,-7.7 L -23.0,-8.3 L -23.1,-8.9 L -23.3,-9.5 L -23.7,-9.9 L -24.2,-10.1 L -24.7,-10.2 L -25.2,-10.1 L -25.5,-9.8 L -25.8,-9.5 L -25.9,-9.1 L -25.9,-8.8 L -25.8,-8.5 L -25.6,-8.3 L -25.3,-8.2 L -25.1,-8.2 L -24.9,-8.3 M -27.6,-17.3 L -28.3,-16.7 L -29.2,-16.3 L -30.1,-16.2 L -30.9,-16.5 L -31.6,-16.9 L -32.1,-17.6 L -32.3,-18.3 L -32.3,-19.0 L -32.1,-19.7 L -31.7,-20.2 L -31.1,-20.5 L -30.5,-20.7 L -30.0,-20.6 L -29.5,-20.4 L -29.1,-20.0 L -28.9,-19.6 L -28.9,-19.2 L -29.0,-18.8 L -29.2,-18.4 L -29.5,-18.2 L -29.8,-18.2 L -30.1,-18.2 L -30.3,-18.3 L -30.4,-18.5 L -30.5,-18.7 M -20.8,-20.8 L -20.0,-21.3 L -19.0,-21.4 L -18.1,-21.3 L -17.4,-20.9 L -16.8,-20.3 L -16.5,-19.6 L -16.4,-18.8 L -16.6,-18.1 L -16.9,-17.5 L -17.5,-17.1 L -18.1,-16.9 L -18.7,-16.9 L -19.2,-17.1 L -19.6,-17.4 L -19.9,-17.8 L -20.0,-18.3 L -19.9,-18.7 L -19.7,-19.1 L -19.5,-19.4 L -19.2,-19.5 L -18.8,-19.5 L -18.6,-19.4 L -18.4,-19.3 L -18.3,-19.1 L -18.3,-18.9 M -17.3,-27.6 L -16.7,-28.3 L -16.3,-29.2 L -16.2,-30.1 L -16.5,-30.9 L -16.9,-31.6 L -17.6,-32.1 L -18.3,-32.3 L -19.0,-32.3 L -19.7,-32.1 L -20.2,-31.7 L -20.5,-31.1 L -20.7,-30.5 L -20.6,-30.0 L -20.4,-29.5 L -20.0,-29.1 L -19.6,-28.9 L -19.2,-28.9 L -18.8,-29.0 L -18.4,-29.2 L -18.2,-29.5 L -18.2,-29.8 L -18.2,-30.1 L -18.3,-30.3 L -18.5,-30.4 L -18.7,-30.5 M -9.7,-27.8 L -10.5,-27.2 L -11.1,-26.5 L -11.3,-25.6 L -11.3,-24.7 L -11.0,-24.0 L -10.5,-23.3 L -9.9,-22.9 L -9.1,-22.8 L -8.4,-22.9 L -7.8,-23.1 L -7.4,-23.6 L -7.1,-24.1 L -7.1,-24.7 L -7.2,-25.2 L -7.4,-25.7 L -7.8,-25.9 L -8.2,-26.1 L -8.6,-26.1 L -9.0,-25.9 L -9.3,-25.7 L -9.4,-25.4 L -9.4,-25.2 L -9.4,-24.9 L -9.2,-24.7 L -9.1,-24.6 M -3.7,-32.4 L -4.6,-32.5 L -5.4,-33.0 L -6.0,-33.6 L -6.4,-34.4 L -6.5,-35.3 L -6.3,-36.0 L -5.9,-36.7 L -5.3,-37.1 L -4.6,-37.4 L -4.0,-37.4 L -3.4,-37.1 L -2.9,-36.8 L -2.6,-36.3 L -2.5,-35.8 L -2.5,-35.3 L -2.7,-34.8 L -3.0,-34.5 L -3.4,-34.4 L -3.8,-34.3 L -4.1,-34.4 L -4.4,-34.6 L -4.5,-34.8 L -4.6,-35.1 L -4.5,-35.3 L -4.4,-35.5 M 3.3,-29.2 L 4.2,-28.9 L 4.9,-28.2 L 5.3,-27.5 L 5.5,-26.6 L 5.4,-25.8 L 5.0,-25.1 L 4.5,-24.5 L 3.8,-24.2 L 3.1,-24.2 L 2.5,-24.3 L 2.0,-24.6 L 1.6,-25.1 L 1.4,-25.7 L 1.4,-26.2 L 1.6,-26.7 L 1.8,-27.0 L 2.2,-27.3 L 2.6,-27.3 L 3.0,-27.3 L 3.3,-27.1 L 3.5,-26.9 L 3.6,-26.6 L 3.6,-26.4 L 3.5,-26.2 L 3.4,-26.0 M 10.8,-30.8 L 11.7,-30.7 L 12.6,-30.9 L 13.4,-31.4 L 13.9,-32.1 L 14.2,-32.9 L 14.1,-33.7 L 13.9,-34.4 L 13.4,-35.0 L 12.8,-35.4 L 12.2,-35.5 L 11.5,-35.5 L 11.0,-35.2 L 10.6,-34.8 L 10.4,-34.3 L 10.3,-33.8 L 10.4,-33.4 L 10.7,-33.0 L 11.0,-32.7 L 11.3,-32.6 L 11.7,-32.6 L 12.0,-32.8 L 12.2,-33.0 L 12.3,-33.2 L 12.3,-33.4 L 12.2,-33.6 M 15.6,-24.9 L 14.7,-25.2 L 13.8,-25.1 L 12.9,-24.8 L 12.3,-24.3 L 11.9,-23.5 L 11.7,-22.8 L 11.8,-22.0 L 12.1,-21.3 L 12.6,-20.8 L 13.2,-20.6 L 13.8,-20.5 L 14.4,-20.6 L 14.9,-20.9 L 15.2,-21.3 L 15.4,-21.8 L 15.4,-22.3 L 15.3,-22.7 L 15.0,-23.0 L 14.7,-23.2 L 14.3,-23.3 L 14.0,-23.2 L 13.8,-23.1 L 13.6,-22.9 L 13.6,-22.7 L 13.6,-22.5 M 23.1,-23.1 L 22.6,-23.9 L 22.4,-24.8 L 22.5,-25.7 L 22.9,-26.5 L 23.5,-27.0 L 24.3,-27.4 L 25.0,-27.5 L 25.7,-27.3 L 26.3,-26.9 L 26.7,-26.4 L 26.9,-25.8 L 26.9,-25.2 L 26.8,-24.6 L 26.4,-24.2 L 26.0,-24.0 L 25.5,-23.9 L 25.1,-23.9 L 24.7,-24.1 L 24.5,-24.4 L 24.3,-24.7 L 24.3,-25.0 L 24.4,-25.3 L 24.6,-25.5 L 24.8,-25.6 L 25.0,-25.6 M 24.9,-15.6 L 25.2,-14.7 L 25.1,-13.8 L 24.8,-12.9 L 24.3,-12.3 L 23.5,-11.9 L 22.8,-11.7 L 22.0,-11.8 L 21.3,-12.1 L 20.8,-12.6 L 20.6,-13.2 L 20.5,-13.8 L 20.6,-14.4 L 20.9,-14.9 L 21.3,-15.2 L 21.8,-15.4 L 22.3,-15.4 L 22.7,-15.3 L 23.0,-15.0 L 23.2,-14.7 L 23.3,-14.3 L 23.2,-14.0 L 23.1,-13.8 L 22.9,-13.6 L 22.7,-13.6 L 22.5,-13.6 M 30.8,-10.8 L 31.3,-10.0 L 32.1,-9.4 L 32.9,-9.2 L 33.8,-9.2 L 34.6,-9.5 L 35.2,-10.0 L 35.6,-10.6 L 35.7,-11.3 L 35.7,-12.0 L 35.4,-12.6 L 34.9,-13.1 L 34.4,-13.4 L 33.8,-13.4 L 33.3,-13.3 L 32.9,-13.0 L 32.6,-12.7 L 32.4,-12.2 L 32.4,-11.8 L 32.6,-11.5 L 32.8,-11.2 L 33.1,-11.1 L 33.4,-11.0 L 33.6,-11.1 L 33.8,-11.2 L 33.9,-11.4 M 29.2,-3.3 L 28.9,-4.2 L 28.2,-4.9 L 27.5,-5.3 L 26.6,-5.5 L 25.8,-5.4 L 25.1,-5.0 L 24.5,-4.5 L 24.2,-3.8 L 24.2,-3.1 L 24.3,-2.5 L 24.6,-2.0 L 25.1,-1.6 L 25.7,-1.4 L 26.2,-1.4 L 26.7,-1.6 L 27.0,-1.8 L 27.3,-2.2 L 27.3,-2.6 L 27.3,-3.0 L 27.1,-3.3 L 26.9,-3.5 L 26.6,-3.6 L 26.4,-3.6 L 26.2,-3.5 L 26.0,-3.4';

  // Triple-layer relief rendering: dark undercut shadow, bright highlight ridge, rich wax face
  const Relief: React.FC<{
    children: (fill: string, dx: number, dy: number, o: number) => React.ReactNode;
  }> = ({ children }) => (
    <g>
      {children('#33100c', 0.9, 1.05, 0.95)}
      {children('#c4665a', -0.6, -0.7, 0.7)}
      {children('#8a2e25', 0, 0, 1)}
    </g>
  );

  // Concentric stamped rings (matching WaxSeal)
  const rings = (fill: string, dx: number, dy: number, o: number) => (
    <g transform={`translate(${dx} ${dy})`} opacity={o} fill="none" stroke={fill}>
      <circle r="36" strokeWidth="1.5" />
      <circle r="34.2" strokeWidth="0.7" />
      <circle r="27" strokeWidth="1.3" />
      <circle r="25.2" strokeWidth="0.6" />
    </g>
  );

  // Roman Laurel Victor Wreath (encircling leaves matching WaxSeal)
  const vine = (fill: string, dx: number, dy: number, o: number) => (
    <g transform={`translate(${dx} ${dy})`} opacity={o}>
      <path d={VINE_A} fill="none" stroke={fill} strokeWidth="0.55" />
      <path d={VINE_B} fill="none" stroke={fill} strokeWidth="0.55" strokeLinecap="round" />
      <g fill={fill}>
        <ellipse cx="29.9" cy="6.8" rx="1.9" ry="0.75" transform="rotate(103 29.9 6.8)" />
        <ellipse cx="28.2" cy="13.6" rx="1.9" ry="0.75" transform="rotate(116 28.2 13.6)" />
        <ellipse cx="24.0" cy="19.1" rx="1.9" ry="0.75" transform="rotate(129 24.0 19.1)" />
        <ellipse cx="19.5" cy="24.5" rx="1.9" ry="0.75" transform="rotate(141 19.5 24.5)" />
        <ellipse cx="13.3" cy="27.6" rx="1.9" ry="0.75" transform="rotate(154 13.3 27.6)" />
        <ellipse cx="7.0" cy="30.5" rx="1.9" ry="0.75" transform="rotate(167 7.0 30.5)" />
        <ellipse cx="-0.0" cy="30.7" rx="1.9" ry="0.75" transform="rotate(180 -0.0 30.7)" />
        <ellipse cx="-7.0" cy="30.5" rx="1.9" ry="0.75" transform="rotate(193 -7.0 30.5)" />
        <ellipse cx="-13.3" cy="27.6" rx="1.9" ry="0.75" transform="rotate(206 -13.3 27.6)" />
        <ellipse cx="-19.5" cy="24.5" rx="1.9" ry="0.75" transform="rotate(219 -19.5 24.5)" />
        <ellipse cx="-24.0" cy="19.1" rx="1.9" ry="0.75" transform="rotate(231 -24.0 19.1)" />
        <ellipse cx="-28.2" cy="13.6" rx="1.9" ry="0.75" transform="rotate(244 -28.2 13.6)" />
        <ellipse cx="-29.9" cy="6.8" rx="1.9" ry="0.75" transform="rotate(257 -29.9 6.8)" />
        <ellipse cx="-31.3" cy="0.0" rx="1.9" ry="0.75" transform="rotate(270 -31.3 0.0)" />
        <ellipse cx="-29.9" cy="-6.8" rx="1.9" ry="0.75" transform="rotate(283 -29.9 -6.8)" />
        <ellipse cx="-28.2" cy="-13.6" rx="1.9" ry="0.75" transform="rotate(296 -28.2 -13.6)" />
        <ellipse cx="-24.0" cy="-19.1" rx="1.9" ry="0.75" transform="rotate(309 -24.0 -19.1)" />
        <ellipse cx="-19.5" cy="-24.5" rx="1.9" ry="0.75" transform="rotate(321 -19.5 -24.5)" />
        <ellipse cx="-13.3" cy="-27.6" rx="1.9" ry="0.75" transform="rotate(334 -13.3 -27.6)" />
        <ellipse cx="-7.0" cy="-30.5" rx="1.9" ry="0.75" transform="rotate(347 -7.0 -30.5)" />
        <ellipse cx="-0.0" cy="-30.7" rx="1.9" ry="0.75" transform="rotate(360 -0.0 -30.7)" />
        <ellipse cx="7.0" cy="-30.5" rx="1.9" ry="0.75" transform="rotate(373 7.0 -30.5)" />
        <ellipse cx="13.3" cy="-27.6" rx="1.9" ry="0.75" transform="rotate(386 13.3 -27.6)" />
        <ellipse cx="19.5" cy="-24.5" rx="1.9" ry="0.75" transform="rotate(399 19.5 -24.5)" />
        <ellipse cx="24.0" cy="-19.1" rx="1.9" ry="0.75" transform="rotate(411 24.0 -19.1)" />
        <ellipse cx="28.2" cy="-13.6" rx="1.9" ry="0.75" transform="rotate(424 28.2 -13.6)" />
        <ellipse cx="29.9" cy="-6.8" rx="1.9" ry="0.75" transform="rotate(437 29.9 -6.8)" />
        <ellipse cx="31.3" cy="-0.0" rx="1.9" ry="0.75" transform="rotate(450 31.3 -0.0)" />
      </g>
    </g>
  );

  // Imperial Crown & Gothic "C" for Champion (or Scales for Draw)
  const championMotif = (fill: string, dx: number, dy: number, o: number) => {
    if (isDraw) {
      return (
        <g transform={`translate(${dx} ${dy})`} opacity={o}>
          {/* Scales of Justice */}
          <g stroke={fill} fill="none">
            <line x1="0" y1="-13" x2="0" y2="9" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="-10" y1="-8" x2="10" y2="-8" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M -12,-8 L -15,1 L -9,1 Z" fill={fill} strokeWidth="0.6" />
            <path d="M 12,-8 L 9,1 L 15,1 Z" fill={fill} strokeWidth="0.6" />
            <circle cx="0" cy="-13" r="1.3" fill={fill} />
            <rect x="-4" y="8" width="8" height="2" rx="0.5" fill={fill} />
          </g>
          {/* EQUILIBRIUM Subtitle */}
          <text
            x="0"
            y="15"
            textAnchor="middle"
            fill={fill}
            className="font-cinzel select-none font-bold uppercase text-[4.8px] tracking-[0.2em]"
            style={{ letterSpacing: '0.18em' }}
          >
            AEQUITAS
          </text>
        </g>
      );
    }

    return (
      <g transform={`translate(${dx} ${dy})`} opacity={o}>
        {/* Imperial Chess Crown atop */}
        <g transform="translate(0, -11) scale(0.68)" fill={fill}>
          <rect x="-10" y="4.5" width="20" height="2.2" rx="0.6" />
          <path d="M -10,4.5 L -12,-2 L -6,1 L 0,-6 L 6,1 L 12,-2 L 10,4.5 Z" />
          <circle cx="-12" cy="-2.5" r="1.1" />
          <circle cx="0" cy="-6.5" r="1.4" />
          <circle cx="12" cy="-2.5" r="1.1" />
          <line x1="0" y1="-10.5" x2="0" y2="-7" stroke={fill} strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-2" y1="-8.8" x2="2" y2="-8.8" stroke={fill} strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Majestic Blackletter Fraktur "C" for Champion */}
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fill={fill}
          stroke={fill}
          strokeWidth="0.5"
          style={{
            fontFamily:
              "'UnifrakturCook', 'UnifrakturMaguntia', 'Pinyon Script', 'Times New Roman', serif",
            fontWeight: 700,
            fontSize: 27,
          }}
        >
          C
        </text>

        {/* Inscribed "CHAMPION" Label in crisp Roman capitals */}
        <text
          x="0"
          y="15"
          textAnchor="middle"
          fill={fill}
          className="font-cinzel select-none font-extrabold uppercase text-[4.6px]"
          style={{ letterSpacing: '0.22em' }}
        >
          CHAMPION
        </text>

        {/* Royal 5-point star & heraldic finials below */}
        <g transform="translate(0, 19.5) scale(0.75)" fill={fill}>
          <path d="M 0,-4.4 L 1.1,-1.3 L 4.2,-1.3 L 1.7,0.6 L 2.6,3.8 L 0,1.9 L -2.6,3.8 L -1.7,0.6 L -4.2,-1.3 L -1.1,-1.3 Z" />
        </g>
      </g>
    );
  };

  // Greyscale height map: brighter = higher (identical to WaxSeal in TornOldBookPage)
  const heightMap = (
    <g>
      <path d={BLOB} fill="#6a6a6a" />
      <path d={BLOB} fill="none" stroke="#ffffff" strokeWidth="7" clipPath={`url(#${body}-clip)`} />
      <circle r="38.6" fill="#ffffff" opacity="0.9" />
      <circle r="37" fill="#2a2a2a" />
      <g fill="none" stroke="#ffffff">
        <circle r="36" strokeWidth="1.7" />
        <circle r="34.2" strokeWidth="0.8" />
        <circle r="27" strokeWidth="1.5" />
        <circle r="25.2" strokeWidth="0.7" />
      </g>
      <g fill="none" stroke="#ffffff" strokeWidth="0.55">
        <path d={VINE_A} opacity="0.8" />
        <path d={VINE_B} strokeLinecap="round" />
      </g>
      <g fill="#ffffff">
        <ellipse cx="29.9" cy="6.8" rx="1.9" ry="0.75" transform="rotate(103 29.9 6.8)" />
        <ellipse cx="28.2" cy="13.6" rx="1.9" ry="0.75" transform="rotate(116 28.2 13.6)" />
        <ellipse cx="24.0" cy="19.1" rx="1.9" ry="0.75" transform="rotate(129 24.0 19.1)" />
        <ellipse cx="19.5" cy="24.5" rx="1.9" ry="0.75" transform="rotate(141 19.5 24.5)" />
        <ellipse cx="13.3" cy="27.6" rx="1.9" ry="0.75" transform="rotate(154 13.3 27.6)" />
        <ellipse cx="7.0" cy="30.5" rx="1.9" ry="0.75" transform="rotate(167 7.0 30.5)" />
        <ellipse cx="-0.0" cy="30.7" rx="1.9" ry="0.75" transform="rotate(180 -0.0 30.7)" />
        <ellipse cx="-7.0" cy="30.5" rx="1.9" ry="0.75" transform="rotate(193 -7.0 30.5)" />
        <ellipse cx="-13.3" cy="27.6" rx="1.9" ry="0.75" transform="rotate(206 -13.3 27.6)" />
        <ellipse cx="-19.5" cy="24.5" rx="1.9" ry="0.75" transform="rotate(219 -19.5 24.5)" />
        <ellipse cx="-24.0" cy="19.1" rx="1.9" ry="0.75" transform="rotate(231 -24.0 19.1)" />
        <ellipse cx="-28.2" cy="13.6" rx="1.9" ry="0.75" transform="rotate(244 -28.2 13.6)" />
        <ellipse cx="-29.9" cy="6.8" rx="1.9" ry="0.75" transform="rotate(257 -29.9 6.8)" />
        <ellipse cx="-31.3" cy="0.0" rx="1.9" ry="0.75" transform="rotate(270 -31.3 0.0)" />
        <ellipse cx="-29.9" cy="-6.8" rx="1.9" ry="0.75" transform="rotate(283 -29.9 -6.8)" />
        <ellipse cx="-28.2" cy="-13.6" rx="1.9" ry="0.75" transform="rotate(296 -28.2 -13.6)" />
        <ellipse cx="-24.0" cy="-19.1" rx="1.9" ry="0.75" transform="rotate(309 -24.0 -19.1)" />
        <ellipse cx="-19.5" cy="-24.5" rx="1.9" ry="0.75" transform="rotate(321 -19.5 -24.5)" />
        <ellipse cx="-13.3" cy="-27.6" rx="1.9" ry="0.75" transform="rotate(334 -13.3 -27.6)" />
        <ellipse cx="-7.0" cy="-30.5" rx="1.9" ry="0.75" transform="rotate(347 -7.0 -30.5)" />
        <ellipse cx="-0.0" cy="-30.7" rx="1.9" ry="0.75" transform="rotate(360 -0.0 -30.7)" />
        <ellipse cx="7.0" cy="-30.5" rx="1.9" ry="0.75" transform="rotate(373 7.0 -30.5)" />
        <ellipse cx="13.3" cy="-27.6" rx="1.9" ry="0.75" transform="rotate(386 13.3 -27.6)" />
        <ellipse cx="19.5" cy="-24.5" rx="1.9" ry="0.75" transform="rotate(399 19.5 -24.5)" />
        <ellipse cx="24.0" cy="-19.1" rx="1.9" ry="0.75" transform="rotate(411 24.0 -19.1)" />
        <ellipse cx="28.2" cy="-13.6" rx="1.9" ry="0.75" transform="rotate(424 28.2 -13.6)" />
        <ellipse cx="29.9" cy="-6.8" rx="1.9" ry="0.75" transform="rotate(437 29.9 -6.8)" />
        <ellipse cx="31.3" cy="-0.0" rx="1.9" ry="0.75" transform="rotate(450 31.3 -0.0)" />
      </g>
      <circle r="24" fill="#555555" />
      {isDraw ? (
        <g stroke="#ffffff" fill="none">
          <line x1="0" y1="-13" x2="0" y2="9" strokeWidth="1.3" />
          <line x1="-10" y1="-8" x2="10" y2="-8" strokeWidth="1.3" />
          <path d="M -12,-8 L -15,1 L -9,1 Z" fill="#ffffff" />
          <path d="M 12,-8 L 9,1 L 15,1 Z" fill="#ffffff" />
          <circle cx="0" cy="-13" r="1.3" fill="#ffffff" />
        </g>
      ) : (
        <g>
          {/* Crown */}
          <g transform="translate(0, -11) scale(0.68)" fill="#ffffff">
            <rect x="-10" y="4.5" width="20" height="2.2" rx="0.6" />
            <path d="M -10,4.5 L -12,-2 L -6,1 L 0,-6 L 6,1 L 12,-2 L 10,4.5 Z" />
            <circle cx="-12" cy="-2.5" r="1.1" />
            <circle cx="0" cy="-6.5" r="1.4" />
            <circle cx="12" cy="-2.5" r="1.1" />
            <line x1="0" y1="-10.5" x2="0" y2="-7" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="-2" y1="-8.8" x2="2" y2="-8.8" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          </g>
          {/* C */}
          <text
            x="0"
            y="7"
            textAnchor="middle"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="0.8"
            style={{
              fontFamily:
                "'UnifrakturCook', 'UnifrakturMaguntia', 'Pinyon Script', 'Times New Roman', serif",
              fontWeight: 700,
              fontSize: 27,
            }}
          >
            C
          </text>
          {/* Star */}
          <g transform="translate(0, 19.5) scale(0.75)" fill="#ffffff">
            <path d="M 0,-4.4 L 1.1,-1.3 L 4.2,-1.3 L 1.7,0.6 L 2.6,3.8 L 0,1.9 L -2.6,3.8 L -1.7,0.6 L -4.2,-1.3 L -1.1,-1.3 Z" />
          </g>
        </g>
      )}
    </g>
  );

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-label={isDraw ? 'Equilibrium Royal Wax Seal' : 'Champion Royal Wax Seal'}
    >
      <svg
        viewBox="-56 -56 112 112"
        className="w-24 h-24 sm:w-28 sm:h-28 overflow-visible"
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'center',
          animation: 'waxStamp 450ms cubic-bezier(0.2, 0.8, 0.3, 1) both',
        }}
      >
        <defs>
          <radialGradient id={body} cx="36%" cy="30%" r="82%">
            <stop offset="0%" stopColor="#a8392e" />
            <stop offset="55%" stopColor="#8c2e25" />
            <stop offset="100%" stopColor="#5e1a14" />
          </radialGradient>
          <radialGradient id={field} cx="46%" cy="40%" r="75%">
            <stop offset="0%" stopColor="#80281f" />
            <stop offset="100%" stopColor="#6a2019" />
          </radialGradient>
          <filter id={rough} x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="2" seed="9" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={grainId} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.05  0 0 0 0 0.04  0 0 0 1.6 -0.6" />
          </filter>
          <filter id={soft} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
          <filter id={shadow} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id={diffId} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="h0" />
            <feGaussianBlur in="h0" stdDeviation="0.85" result="h" />
            <feDiffuseLighting in="h" surfaceScale="5" diffuseConstant="0.7" lightingColor="#ffffff">
              <feDistantLight azimuth="235" elevation="48" />
            </feDiffuseLighting>
          </filter>
          <filter id={specId} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="h0" />
            <feGaussianBlur in="h0" stdDeviation="0.85" result="h" />
            <feSpecularLighting in="h" surfaceScale="5" specularConstant="0.9" specularExponent="55" lightingColor="#ffd8c4">
              <feDistantLight azimuth="235" elevation="42" />
            </feSpecularLighting>
          </filter>
          <clipPath id={`${body}-clip`}>
            <path d={BLOB} />
          </clipPath>
        </defs>

        {/* 1. Contact shadow on the paper */}
        <path d={BLOB} fill="#2a1505" opacity="0.5" transform="translate(3 6)" filter={`url(#${shadow})`} />

        {/* 2. Thick, rolled wax edge */}
        <g filter={`url(#${rough})`}>
          <path d={BLOB} fill={`url(#${body})`} stroke="#4a140f" strokeWidth="0.9" />
        </g>
        <g clipPath={`url(#${body}-clip)`}>
          <path
            d={BLOB}
            fill="none"
            stroke="#d98a7c"
            strokeWidth="5"
            opacity="0.28"
            transform="translate(-1.6 -1.8)"
            filter={`url(#${soft})`}
          />
          <path
            d={BLOB}
            fill="none"
            stroke="#2c0c08"
            strokeWidth="5"
            opacity="0.4"
            transform="translate(2 2.4)"
            filter={`url(#${soft})`}
          />
        </g>

        {/* 3. Recessed, pressed circular disc */}
        <circle r="38.4" fill="#4a140f" opacity="0.55" />
        <circle r="37.4" fill={`url(#${field})`} />
        <circle
          r="37.4"
          fill="none"
          stroke="#2c0c08"
          strokeWidth="1.4"
          opacity="0.5"
          transform="translate(0.6 0.7)"
          filter={`url(#${soft})`}
        />

        {/* 4. Raised rings, laurel vine, and Champion motif in physical relief */}
        <Relief>{rings}</Relief>
        <Relief>{vine}</Relief>
        <Relief>{championMotif}</Relief>

        {/* 5. 3D lighting from the upper left: diffuse shading, then a soft specular sheen */}
        <g clipPath={`url(#${body}-clip)`} style={{ mixBlendMode: 'soft-light' }}>
          <g filter={`url(#${diffId})`}>{heightMap}</g>
        </g>
        <g clipPath={`url(#${body}-clip)`} style={{ mixBlendMode: 'screen' }} opacity="0.55">
          <g filter={`url(#${specId})`}>{heightMap}</g>
        </g>

        {/* 6. Fine wax grain over everything */}
        <circle r="45" fill="#2a0c08" opacity="0.2" filter={`url(#${grainId})`} clipPath={`url(#${body}-clip)`} />
      </svg>
    </div>
  );
};
