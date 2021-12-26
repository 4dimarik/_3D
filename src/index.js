import Santa from "./modules/santa";

const santa = new Santa();

document.querySelector("#start").addEventListener("click", () => {
  if (santa.animationMoveRight) {
    santa.stopMoveRight();
    santa.animationMoveRight = null;
  } else {
    santa.moveRight();
  }
});
document.querySelector("#reset").addEventListener("click", () => {
  santa.stopMoveRight();
  santa.setStartPosition();
});
