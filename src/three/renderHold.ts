// A full-screen overlay that hides the 3D scene can ask it to stop drawing for a while,
// so the overlay's own animation gets every frame to itself.
let holds = 0;

export const isSceneRenderHeld = () => holds > 0;

/** Stops the scene from drawing until the returned function is called. */
export const holdSceneRender = () => {
  let held = true;
  holds++;
  return () => {
    if (!held) return;
    held = false;
    holds--;
  };
};
