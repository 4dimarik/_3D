export function debounce(calledFunc, ms) {
  let previousCall;
  let lastCall;
  let callTimer;
  return function perform(...args) {
    previousCall = lastCall;
    lastCall = Date.now();

    if (previousCall && lastCall - previousCall <= ms) {
      clearTimeout(callTimer);
    }

    callTimer = setTimeout(() => calledFunc(...args), ms);
  };
}
export function animate({
  timing,
  draw,
  duration,
  completed = function () {},
}) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    } else {
      completed();
    }
  });
}
