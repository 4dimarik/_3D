export default class Modal {
  constructor({ buttonsClassName, ...rest }) {
    this.buttonsClassName = buttonsClassName;
    this.animationIsOn = false;
    this.init({ ...rest });
  }
  init({ triggerAreaSelector, modalSelector, closeBtnSelector }) {
    this.triggerAreaSelector = document.querySelector(triggerAreaSelector);
    this.modal = document.querySelector(modalSelector);
    this.closeBtn = this.modal.querySelector(closeBtnSelector);
    this.setEventListener();
    this.animationInit();
  }

  setEventListener() {
    this.triggerAreaSelector.addEventListener("click", (e) => {
      const { target } = e;
      if ([...target.classList].includes(this.buttonsClassName)) {
        this.modal.style.display = "block";
        this.animation();
      }
    });
    this.modal.addEventListener("click", (e) => {
      const { target } = e;
      if (target === this.closeBtn) {
        this.modal.style.display = "none";
        this.animationInit();
      }
    });
  }

  getModalSomeStyle() {
    let { top, opacity } = getComputedStyle(this.modal);
    top = +top.replace("px", "");
    opacity = +opacity;
    return {
      top,
      opacity,
    };
  }
  animationInit() {
    if (window.innerWidth > 768) {
      this.animationIsOn = true;
      this.modal.style.opacity = 0;
    } else {
      this.animationIsOn = false;
      this.modal.style.opacity = 1;
    }
  }
  animation() {
    if (this.animationIsOn) {
      this.madalOpenAnimation = requestAnimationFrame(
        this.animation.bind(this)
      );
      let { opacity } = this.getModalSomeStyle();
      this.modal.style.opacity = opacity + 0.03 < 1 ? `${opacity + 0.03}` : "1";
      if (this.modal.style.opacity === "1") {
        cancelAnimationFrame(this.madalOpenAnimation);
      }
    }
  }
}
