export function onlyOpenOnDesktopDevice(ctx) {
  ctx.font = '16px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Please open on desktop device', canvas.width / 2, canvas.height / 2);
}

export function isMobile() {
  return new RegExp('mobile', 'ig').test(navigator.userAgent);
}
