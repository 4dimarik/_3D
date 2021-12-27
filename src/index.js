import Timer from "./modules/timer";
import Menu from "./modules/menu";
import Modal from "./modules/modal";

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

const menu = new Menu();
const modal = new Modal();

timer.start();
