import Timer from "./modules/timer";
import Tabs from "./modules/tabs";

const timer = new Timer({
  timerSelector: "#timer",
  format: {
    daysSelector: "#timer-days",
    hoursSelector: "#timer-hours",
    minutesSelector: "#timer-minutes",
    secondsSelector: "#timer-seconds",
  },
  doubleZero: true,
  separator: "name",
});

timer.start();

const tabs = new Tabs({
  tabPanelSelector: "#service-block",
  tabPanelItemSelectors: {
    navSelector: ".service-header",
    navItemSelector: ".service-header-tab",
    tabItemSelector: ".service-tab",
  },
});
