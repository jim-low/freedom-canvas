import mouse from "../mouse.js";

export default class Envelop {
  constructor(ctx, nextAnimation) {
    this.ctx = ctx;
    this.imageInfo = {
      width: 360,
      height: 360,
      path: '/assets/envelop.png',
      isLoaded: false,
    };

    this.canClick = false;
    this.clicked = false;

    this.image = new Image(this.imageInfo.width, this.imageInfo.height);
    this.image.src = this.imageInfo.path;
    this.image.onload = () => {
      this.imageInfo.isLoaded = true;
    };

    this.nextAnimation = nextAnimation;

    this.pos = {
      x: window.innerWidth / 2 - (this.imageInfo.width / 2),
      y: window.innerHeight / 2 - (this.imageInfo.height / 2),
    };

    this.settings = {
      shrinkSpeed: 2.5,
      isAnimationEnd: false,
    };
  }

  draw() {
    if (!this.imageInfo.isLoaded) return;

    const { width, height } = this.imageInfo;
    const { x, y } = {
      x: window.innerWidth / 2 - (this.imageInfo.width / 2),
      y: window.innerHeight / 2 - (this.imageInfo.height / 2),
    };
    this.ctx.drawImage(this.image, x, y, width, height);
  }

  update() {
    const { x, y } = this.pos;
    const { width, height } = this.imageInfo;
    if (mouse.x > x && mouse.x < x + width && mouse.y > y && mouse.y < y + height) {
      this.canClick = true;
      document.body.style.cursor = 'pointer';
    } else {
      this.canClick = false;
      document.body.style.cursor = 'initial';
    }


    if ([width, height].every(dim => dim <= 0) && !this.settings.isAnimationEnd) {
      this.settings.isAnimationEnd = true;
      this.nextAnimation();
      return;
    }

    if (this.clicked) {
      this.handleClick();
    }
  }

  handleClick() {
    if (!this.clicked || this.settings.isAnimationEnd) {
      return;
    }

    const { shrinkSpeed } = this.settings;
    this.imageInfo.width -= shrinkSpeed;
    this.imageInfo.height -= shrinkSpeed;
  }

  isAnimationEnd() {
    return this.settings.isAnimationEnd;
  }
}
