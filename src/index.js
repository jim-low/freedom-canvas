import Freedom from './classes/freedom.js';
import Envelop from './classes/envelop.js';
import TypingText from './classes/typing-text.js';
import { animateFireworks, spawnTrail } from './classes/fireworks.js';
import { isMobile, displayNotice, isPortrait } from './utils/index.js';

export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const MIN_SCREEN_WIDTH = 500;

const freedom = new Freedom(ctx, () => {
  setInterval(() => {
    spawnTrail();
  }, 150);
});

const onYourText = new TypingText(ctx, 'ON YOUR', {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2 + 40,
}, () => {
  setTimeout(() => {
    canvas.classList.add('fade');
  }, 1000);

  setTimeout(() => {
    freedom.startAnimation();
  }, 3000);
});

const congratulationsText = new TypingText(ctx, 'CONGRATULATIONS', {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2 - 20,
}, () => {
  onYourText.startTyping();
});

const envelop = new Envelop(ctx, () => {
  congratulationsText.startTyping();
});

window.addEventListener('click', () => {
  if (envelop.canClick && !envelop.clicked) {
    envelop.clicked = true;
  }
})

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const mobile = isMobile();
  const portrait = isPortrait();
  const screenTooSmall = window.innerWidth <= MIN_SCREEN_WIDTH;
  if (mobile && portrait) {
    displayNotice(ctx, 'Please orient your device to landscape');
    return;
  }

  if (mobile && !portrait && screenTooSmall) {
    displayNotice(ctx, 'Please open in desktop device');
    return;
  }

  envelop.draw();
  envelop.update();

  congratulationsText.draw();

  onYourText.draw();

  freedom.draw();
  freedom.update();

  animateFireworks();

}

animate();
