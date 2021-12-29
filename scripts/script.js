const squareBody = document.querySelector(".square-body");
const startBlocks = squareBody.innerHTML;

const resetBtn = document.querySelector(".btn-reset");

const blockSelector = ".block";

const { width: squareWidth } = getComputedStyle(squareBody);
const { width: blockWidth } = getComputedStyle(
  document.querySelector(blockSelector)
);
const blockNum = squareBody.querySelectorAll(blockSelector).length;
const blockNumInRow = Math.trunc(
  +squareWidth.replace("px", "") / +blockWidth.replace("px", "")
);

const redMask = document.createElement("div");
redMask.className = "red-mask";

squareBody.addEventListener("click", (e) => {
  const { target } = e;
  // получаем кнопку стрелки
  const arrow = target.closest(".arrow");
  // получаем блок на котором нажата стрелка
  const block = target.closest(blockSelector);
  // получаем все блоки
  const blocks = document.querySelectorAll(blockSelector);
  if (arrow) {
    // если кликнули по стрелке
    // получаем блок до текущего блока
    const previousBlock = block.previousElementSibling;
    // получаем блок после текущего блока
    const nextBlock = block.nextElementSibling;
    if (arrow.matches(".arrow.top")) {
      // если перемещаем вверх
      // находим индекс текущего блока
      const index = [...blocks].indexOf(block);
      if (index >= blockNumInRow) {
        // если блок не в верхнем ряду
        // получаем блок с которым должны поменяться
        const currentBlockAtNewPosition = blocks[index - blockNumInRow];
        // перемещаем текущий блок перед блоком с которым должны поменяться
        currentBlockAtNewPosition.insertAdjacentElement("beforebegin", block);
        // перемещаем блок с котомым поменялись перед блоком который был после текущего блока
        nextBlock.insertAdjacentElement(
          "beforebegin",
          currentBlockAtNewPosition
        );
      } else {
        target.insertAdjacentElement("afterend", redMask);
      }
    } else if (arrow.matches(".arrow.right")) {
      // если перемещаем вправо
      // переносим текущий блок после следом стоящего блока
      if (nextBlock) {
        nextBlock.insertAdjacentElement("afterend", block);
      } else {
        target.insertAdjacentElement("afterend", redMask);
      }
    } else if (arrow.matches(".arrow.bottom")) {
      // если перемещаем вниз
      // находим индекс текущего блока
      const index = [...blocks].indexOf(block);
      if (blockNum - index > blockNumInRow) {
        // если блок не в нижнем ряду
        // получаем блок с которым должны поменяться
        const currentBlockAtNewPosition = blocks[index + blockNumInRow];
        // перемещаем текущий блок перед блоком с которым должны поменяться
        currentBlockAtNewPosition.insertAdjacentElement("afterend", block);
        // перемещаем блок с котомым поменялись перед блоком который был после текущего блока
        nextBlock.insertAdjacentElement(
          "beforebegin",
          currentBlockAtNewPosition
        );
      } else {
        target.insertAdjacentElement("afterend", redMask);
      }
    } else if (arrow.matches(".arrow.left")) {
      // если перемещаем влево
      // переносим текущий блок перед предыдущим блоком
      if (previousBlock) {
        previousBlock.insertAdjacentElement("beforebegin", block);
      } else {
        target.insertAdjacentElement("afterend", redMask);
      }
    }
  }
});

resetBtn.addEventListener("click", () => {
  squareBody.innerHTML = startBlocks;
});
