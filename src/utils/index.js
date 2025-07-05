export function displayNotice(ctx, msg) {
  ctx.font = '16px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(msg, canvas.width / 2, canvas.height / 2);
}

export function isMobile() {
  return new RegExp('mobile', 'ig').test(navigator.userAgent);
}

export function isPortrait() {
  return window.matchMedia("(orientation: portrait)").matches;
}
