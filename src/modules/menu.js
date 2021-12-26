export default class Menu {
  constructor() {
    this.menuBtn = document.querySelector(".menu");
    this.menu = document.querySelector("menu");
    this.closeBtn = this.menu.querySelector(".close-btn");
    this.toggleClass = "active-menu";
    this.setEventListener();
  }
  handleTarget() {
    this.menu.classList.toggle(this.toggleClass);
  }
  setEventListener() {
    this.menuBtn.addEventListener("click", this.handleTarget.bind(this));
    this.closeBtn.addEventListener("click", this.handleTarget.bind(this));

    this.menu.addEventListener("click", (e) => {
      const { target } = e;
      if (target.localName === "a" && target.closest("li")) {
        this.handleTarget();
      }
    });
  }
}
