import { animate } from "./helpers";

export default class Modal {
  constructor({ modalSelector }) {
    this.modal = document.querySelector(modalSelector);
    this.animationIsOn = false;
    this.animationInit();
  }
  init({
    triggerAreaSelector,
    buttonsClassName,
    closeBtnSelector,
    modalContentSelector,
  }) {
    this.triggerAreaSelector = document.querySelector(triggerAreaSelector);
    this.buttonsClassName = buttonsClassName;
    this.closeBtn = this.modal.querySelector(closeBtnSelector);
    this.modalContentSelector = modalContentSelector;
    this.setEventListener();
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
    this.animationIsOn = window.innerWidth > 768;
  }
  toggleModal(show, modalBlock = null) {
    modalBlock = modalBlock ? modalBlock : this.modal;
    const animateValue = show
      ? (progress) => progress
      : (progress) => 1 - +progress;
    const animateCompleted = show
      ? () => {
          modalBlock.style.display = "block";
        }
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
    } else {
      animateCompleted();
    }
  }
}
