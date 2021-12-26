export default class Santa {
  constructor() {
    this.object = document.querySelector("#santa");
    this.object.style.width = "25vw";
    this.setStartPosition();
  }
  setStartPosition() {
    const { width } = getComputedStyle(this.object);
    this.object.style.top = "15%";
    this.object.style.left = `-${width}`;
    this.object.style.display = "block";
  }
  moveRight() {
    this.animationMoveRight = requestAnimationFrame(this.moveRight.bind(this));
    let { left, width } = getComputedStyle(this.object);
    left = +left.replace("px", "");
    width = +width.replace("px", "");
    this.object.style.left = `${left + 3}px`;
    if (left >= window.innerWidth - width) {
      cancelAnimationFrame(this.animationMoveRight);
    }
  }
  stopMoveRight() {
    cancelAnimationFrame(this.animationMoveRight);
    this.animationMoveRight = null;
  }
}
