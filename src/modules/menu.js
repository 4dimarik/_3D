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
  }
}
