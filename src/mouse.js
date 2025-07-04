import { canvas } from "./index.js";

const mouse = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (e) => {
  const rect = canvas?.getBoundingClientRect();
  mouse.x = e.clientX - (rect?.x || 0);
  mouse.y = e.clientY - (rect?.y || 0);
});

export default mouse;
