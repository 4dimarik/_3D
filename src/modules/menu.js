import { animate } from "./helpers";

export default class Menu {
  constructor({ toggleClass = "active-menu", ...rest }) {
    this.toggleClass = toggleClass;
    this.init({ ...rest });
  }
  init({
    menuBtnSelector = ".menu",
    menuSelector = "menu",
    closeBtnSelector = ".close-btn",
  }) {
    this.menuBtnSelector = menuBtnSelector;
    this.menu = document.querySelector(menuSelector);
    this.closeBtn = this.menu.querySelector(closeBtnSelector);
    this.setEventListener();
  }
  handleTarget() {
    this.menu.classList.toggle(this.toggleClass);
  }
  setEventListener() {
    document.addEventListener("click", (e) => {
      const { target } = e;
      const isMenuActive = this.menu.classList.contains(this.toggleClass);
      if (target.closest(this.menuBtnSelector)) {
        // открыть/закрыть меню при нажатии на кнопку
        this.handleTarget();
      } else if (target.matches("menu>ul>li>a[href^='#']")) {
        // закрыть меню и переместиться по якорю при выборе пункты меню
        this.handleTarget();
        this.smoothScroll(e.target);
      } else if (target === this.closeBtn) {
        // закрыть меню и при нажатии кнопки close-btn
        e.preventDefault();
        this.handleTarget();
      } else if (!target.closest("menu") && isMenuActive) {
        // закрыть меню и при нажатии вне области меню
        this.menu.classList.remove(this.toggleClass);
      } else if (target.closest("main>a[href^='#']")) {
        // плавное перемещение к #service-block
        e.preventDefault();
        this.smoothScroll(e.target.closest("main>a[href^='#']"));
      }
    });
  }
  smoothScroll(target) {
    const anchorElementId = target.href.replace(/.*#/g, "");
    const anchorElement = document.getElementById(anchorElementId);
    const anchorElementTop = anchorElement.offsetTop;
    const currentTop = window.pageYOffset;
    const top = anchorElementTop - currentTop;

    animate({
      duration: 500,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        window.scrollTo(0, progress * top + currentTop);
      },
    });
  }
}
