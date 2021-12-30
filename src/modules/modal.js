import { animate } from "./helpers";

export default class Modal {
  constructor({ buttonsClassName, ...rest }) {
    this.buttonsClassName = buttonsClassName;
    this.animationIsOn = false;
    this.init({ ...rest });
  }
  init({
    triggerAreaSelector,
    modalSelector,
    closeBtnSelector,
    modalContentSelector,
  }) {
    this.triggerAreaSelector = document.querySelector(triggerAreaSelector);
    this.modal = document.querySelector(modalSelector);
    this.closeBtn = this.modal.querySelector(closeBtnSelector);
    this.modalContentSelector = modalContentSelector;
    this.setEventListener();
    this.animationInit();
  }

  setEventListener() {
    this.triggerAreaSelector.addEventListener("click", (e) => {
      const { target } = e;
      if ([...target.classList].includes(this.buttonsClassName)) {
        this.modal.style.display = "block";
        this.toggleModal(true);
      }
    });
    this.modal.addEventListener("click", (e) => {
      const { target } = e;
      if (target === this.closeBtn) {
        this.toggleModal(false);
      } else if (!target.closest(this.modalContentSelector)) {
        this.toggleModal(false);
      }
    });
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
  toggleModal(show) {
    const modalBlock = this.modal;
    const animateValue = show
      ? (progress) => progress
      : (progress) => 1 - +progress;
    const animateCompleted = show
      ? () => {}
      : () => {
          modalBlock.style.display = "none";
        };
    if (this.animationIsOn) {
      animate({
        duration: 600,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          modalBlock.style.opacity = animateValue(progress);
        },
        completed: animateCompleted,
      });
    }
  }
}
