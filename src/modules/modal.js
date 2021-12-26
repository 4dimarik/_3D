export default class Modal {
  constructor() {
    this.buttons = document.querySelectorAll(".popup-btn");
    this.serviceBlock = document.querySelector("#service-block");
    this.modal = document.querySelector(".popup");
    this.closeBtn = this.modal.querySelector(".popup-close");
    this.setEventListener();
  }
  setEventListener() {
    this.serviceBlock.addEventListener("click", (e) => {
      const { target } = e;
      if ([...target.classList].includes("popup-btn")) {
        this.modal.style.display = "block";
      }
    });
    this.modal.addEventListener("click", (e) => {
      const { target } = e;
      if (target === this.closeBtn) {
        this.modal.style.display = "none";
      }
    });
  }
  animation() {
    //this.animationMoveRight = requestAnimationFrame(this.animation.bind(this));
    let { left, width } = getComputedStyle(this.modal);
    left = +left.replace("px", "");
    width = +width.replace("px", "");
    this.object.style.left = `${left + 3}px`;
    // if (left >= window.innerWidth - width) {
    //   cancelAnimationFrame(this.animationMoveRight);
    // }
  }
}
