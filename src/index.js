import Timer from "./modules/timer";

const timer = new Timer({
  timerSelector: "#timer",
  format: {
    daysSelector: "#timer-days",
    hoursSelector: "#timer-hours",
    minutesSelector: "#timer-minutes",
    secondsSelector: "#timer-seconds",
  },
  doubleZero: true,
  // separator: "name",
});

timer.start();
