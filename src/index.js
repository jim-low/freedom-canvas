import Envelop from './classes/envelop.js';
import TypingText from './classes/typing-text.js';

export const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const onYourText = new TypingText(ctx, 'ON YOUR', {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2 + 40,
}, () => {
  setTimeout(() => {
    canvas.classList.add('fade');
  }, 1000);
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  envelop.draw();
  envelop.update();

  congratulationsText.draw();

  onYourText.draw();

  // if (settings.startFading) {
  //   ctx.fillStyle = 'black';
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);
  // }

  requestAnimationFrame(animate);
}

animate();
