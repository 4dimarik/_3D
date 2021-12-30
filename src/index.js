import Timer from "./modules/timer";
import Menu from "./modules/menu";
import Modal from "./modules/modal";
import Validation from "./modules/validation";
import Tabs from "./modules/tabs";
import Slider from "./modules/slider";
import Calc from "./modules/calc";

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

const menu = new Menu({
  menuBtnSelector: ".menu",
  menuSelector: "menu",
  closeBtnSelector: ".close-btn",
  toggleClass: "active-menu",
});
const modal = new Modal({
  buttonsClassName: "popup-btn",
  triggerAreaSelector: "#service-block",
  modalSelector: ".popup",
  closeBtnSelector: ".popup-close",
});
const validation = new Validation();

const tabs = new Tabs({
  tabPanelSelector: "#service-block",
  tabPanelItemSelectors: {
    navSelector: ".service-header",
    navItemSelector: ".service-header-tab",
    tabItemSelector: ".service-tab",
  },
});

const slider = new Slider({
  sliderBlockSelector: ".portfolio-content",
  slideSelector: ".portfolio-item",
  // activeSlideClass: "portfolio-item-active",
  slideBtnClass: "portfolio-btn",
  dotsBlockSelector: ".portfolio-dots",
  dotClass: "dot",
  // dotActiveClass: "dot-active",
});

const calc = new Calc({
  price: 100,
  selectors: {
    calcBlock: ".calc-block",
    fields: {
      type: ".calc-type",
      square: ".calc-square",
      count: ".calc-count",
      day: ".calc-day",
      total: "#total",
    },
  },
});
