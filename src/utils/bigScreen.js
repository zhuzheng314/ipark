/**
 * Created by zhuzheng on 2017/9/22.
 */
function initScreen (w, h, id, type) {
  const screen = document.getElementById(id)
  const father = screen.parentNode
  const bdw = document.body.clientWidth
  const bdh = document.body.clientHeight
  // const bdw = father.clientWidth || document.body.clientWidth
  // const bdh = father.clientHeight || document.body.clientHeight
  const bdP = bdw / bdh // 屏幕宽高比
  const p = w / h // 传入尺寸宽高比

  if (bdP > p) { // 屏幕比较宽
    screen.style.cssText = `
      width: ${w}px;
      height: ${h}px;
      transform:scale(${bdh / h});
      transform-origin:0px 0px 0px;
      position: absolute;
      top:0px;
      left:${(bdw - (bdh * p)) / 2}px;
    `
  } else { // 屏幕比较窄
    screen.style.cssText = `
      width: ${w}px;
      height: ${h}px;
      transform:scale(${bdw / w});
      transform-origin:0px 0px 0px;
      position: absolute;
      top:${(bdh - (bdw / p)) / 2}px;
      left:0;
    `
  }

  if (window.location.href.includes('full') || type === 'full') {
    screen.style.cssText = `
      width: ${w}px;
      height: ${h}px;
      transform:scale(${bdw / w}, ${bdh / h});
      transform-origin:0px 0px 0px;
      position: absolute;
      top:0;
      left:0;
    `
  }

  window.addEventListener('resize', () => {
    let timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      initScreen(w, h, id)
    }, 300)
  })
}

export default initScreen
