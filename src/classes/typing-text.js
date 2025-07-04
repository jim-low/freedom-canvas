export default class TypingText {
  constructor(ctx, text, pos, nextAnimation) {
    this.ctx = ctx;
    this.text = text.toUpperCase();
    this.displayText = '';
    this.dim = {
      width: window.innerWidth,
      height: 300
    };
    this.pos = { ...pos };

    this.nextAnimation = nextAnimation;

    this.typingSoundEffect = new Audio('/assets/keyboard-typing-sound.mp3');
    this.typingSoundEffect.loop = true;
    this.typingSoundEffect.autoplay = false;

    this.settings = {
      isAnimationEnded: false,
      isAnimationStarted: false,
      typingSpeed: 0.2, // in seconds
      currentIndex: 0,
    };
  }

  draw() {
    const { x, y } = this.pos;
    const { width, height } = this.dim;

    this.ctx.font = 'bold 60px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(this.displayText, x, y, width, height);
  }

  update() {
    const { currentIndex, isAnimationStarted, isAnimationEnded } = this.settings;

    if (!isAnimationStarted || isAnimationEnded) {
      return;
    }

    if (currentIndex >= this.text.length) {
      this.typingSoundEffect.pause();
      this.settings.isAnimationEnded = true;
      this.nextAnimation();
      return;
    }

    this.displayText = this.displayText + this.text[currentIndex];
    ++this.settings.currentIndex;
  }

  startTyping() {
    this.settings.isAnimationStarted = true;
    this.typingSoundEffect.play();

    setInterval(() => {
      this.update();
    }, this.settings.typingSpeed * 1000);
  }
};
