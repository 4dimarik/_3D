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
    this.menuBtn = document.querySelector(menuBtnSelector);
    this.menu = document.querySelector(menuSelector);
    this.closeBtn = this.menu.querySelector(closeBtnSelector);
    this.setEventListener();
  }
  handleTarget() {
    this.menu.classList.toggle(this.toggleClass);
  }
  setEventListener() {
    this.menuBtn.addEventListener("click", this.handleTarget.bind(this));

    this.menu.addEventListener("click", (e) => {
      const { target } = e;
      if (
        (target.localName === "a" && target.closest("li")) ||
        target === this.closeBtn
      ) {
        this.handleTarget();
      }
    });
  }
}
