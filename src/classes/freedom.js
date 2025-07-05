import { isMobile } from "../utils/index.js";

export default class Freedom {
  constructor(ctx, nextAnimation) {
    this.ctx = ctx;
    this.imageInfo = {
      width: 666,
      height: 375,
      path: 'assets/freedom.png',
      isLoaded: false,
    };

    this.nextAnimation = nextAnimation;
    this.isNextAnimationStarted = false;

    this.pos = {
      x: window.innerWidth / 2 - (this.imageInfo.width / 2),
      y: window.innerHeight / 2 - (this.imageInfo.height / 2),
    };

    this.crabRaveMusic = new Audio('assets/crab-rave.mp3');
    this.crabRaveMusic.loop = true;
    this.crabRaveMusic.autoplay = false;

    this.image = new Image(this.imageInfo.width, this.imageInfo.height);
    this.image.src = this.imageInfo.path;
    this.image.onload = () => {
      this.imageInfo.isLoaded = true;
    }

    this.settings = {
      scale: 0,
      scaleRateDesktop: 0.01,
      scaleRateMobile: 0.01 * 0.345,
      maxScaleDesktop: 2.6,
      maxScaleMobile: 1.2,
      isAnimationEnd: false,
      isAnimationStarted: false,
    };
  }

  draw() {
    if (!this.imageInfo.isLoaded) {
      return;
    }

    const { width, height } = this.imageInfo;
    const { scale } = this.settings;
    const { x, y } = {
      x: window.innerWidth / 2 - (width * scale / 2),
      y: window.innerHeight / 2 - (height * scale / 2),
    };

    this.ctx.drawImage(this.image, x, y, width * scale, height * scale);
  }

  update() {
    const { isAnimationStarted, isAnimationEnd, scale } = this.settings;

    if (!isAnimationStarted) {
      return;
    }

    if (isAnimationEnd && !this.isNextAnimationStarted) {
      this.nextAnimation();
      this.isNextAnimationStarted = true;
      return;
    }

    const { maxScaleMobile, maxScaleDesktop, scaleRateMobile, scaleRateDesktop } = this.settings;
    const maxScale = isMobile() ? maxScaleMobile : maxScaleDesktop;
    if (scale >= maxScale) {
      this.settings.isAnimationEnd = true;
      return;
    }

    const scaleRate = isMobile() ? scaleRateMobile : scaleRateDesktop;
    this.settings.scale += scaleRate;
  }

  startAnimation() {
    this.settings.isAnimationStarted = true;
    this.crabRaveMusic.play();
  }
}
