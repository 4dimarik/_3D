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
      if (target.closest("menu")) {
        if (
          (target.localName === "a" && target.closest("li")) ||
          target === this.closeBtn
        ) {
          this.handleTarget();
        }
      } else if (isMenuActive) {
        this.menu.classList.remove(this.toggleClass);
      } else if (target.closest(this.menuBtnSelector)) {
        this.handleTarget();
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.matches("li>a[href^='#']")) {
        e.preventDefault();
        this.smoothScroll(e.target);
      } else if (e.target.closest("main>a[href^='#']")) {
        e.preventDefault();
        this.smoothScroll(e.target.closest("main>a[href^='#']"));
      }
    });
  }
  smoothScroll(target) {
    const anchorElementId = target.href.replace(/http.*#/g, "");
    const anchorElement = document.getElementById(anchorElementId);
    const top = anchorElement.offsetTop;
    animate({
      duration: 500,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        window.scrollTo(0, progress * top);
      },
    });
  }
}
