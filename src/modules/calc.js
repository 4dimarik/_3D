export default class Calc {
  constructor({ price = 100, selectors }) {
    this.price = price;
    this.selectors = selectors;
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
    const squareValue = this.fields.square.value;
    let countValue = +this.fields.count.value;
    let dayValue = +this.fields.day.value;

    let totalValue = 0;

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
      totalValue = this.price * typeValue * squareValue * countValue * dayValue;
    } else {
      totalValue = 0;
    }
    this.fields.total.textContent = totalValue;
  }
  setEventListener() {
    this.calcBlock.addEventListener("input", () => {
      this.count();
    });
  }
}
