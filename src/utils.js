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
