export default class Calc {
  constructor({ price = 100, selectors }) {
    this.price = price;
    this.selectors = selectors;
    this.totalValue = 0;
    this.init({ ...selectors });
    this.setEventListener();
  }
  init({ calcBlock, fields }) {
    this.calcBlock = document.querySelector(calcBlock);
    this.fields = {};
    Object.keys(fields).forEach((field) => {
      this.fields[field] = this.calcBlock.querySelector(fields[field]);
    });
  }
  count() {
    const typeValue = +this.fields.type.value;
    const squareValue = +this.fields.square.value;
    let countValue = +this.fields.count.value;
    let dayValue = +this.fields.day.value;
    console.log(squareValue);

    if (!countValue) {
      countValue = 1;
    } else if (countValue > 1) {
      countValue = 1 + countValue / 10;
    }

    if (!dayValue) {
      dayValue = 1;
    } else if (dayValue < 5) {
      dayValue = 2;
    } else if (dayValue < 10) {
      dayValue = 1.5;
    } else {
      dayValue = 1;
    }

    if (typeValue && squareValue) {
      this.totalValue =
        this.price * typeValue * squareValue * countValue * dayValue;
      // console.log(this.price, typeValue, squareValue, countValue, dayValue);
      // this.setTotalValue();
      // console.log(this.totalValue);
    } else {
      this.totalValue = 0;
    }
    this.setTotalValue();
    // this.fields.total.textContent = 0;
  }
  setEventListener() {
    this.calcBlock.addEventListener("input", () => {
      this.count();
    });
  }
  setTotalValue() {
    const animationTotalValue = requestAnimationFrame(
      this.setTotalValue.bind(this)
    );
    let currentTotalValue = +this.fields.total.textContent;
    if (currentTotalValue >= this.totalValue) {
      this.fields.total.textContent = this.totalValue;
      cancelAnimationFrame(animationTotalValue);
    } else {
      this.fields.total.textContent = currentTotalValue + 20;
    }
  }
}
