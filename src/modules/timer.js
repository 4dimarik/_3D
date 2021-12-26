export default class Timer {
  constructor({
    deadLine = "2022-01-01",
    timerSelector,
    format = {},
    separator = ":",
  }) {
    this.timerSelector = timerSelector;
    this.formatSelectors = format;
    this.separator = separator;
    this.deadLine = deadLine;
    this.init();
  }
  init() {
    this.timer = document.querySelector(this.timerSelector);
    this.format = {};

    if (this.timer) {
      Object.keys(this.formatSelectors).forEach((selector) => {
        let elementName = selector.replace("Selector", "");
        this.format[elementName] = this.timer.querySelector(
          this.formatSelectors[selector]
        );
      });
    }
  }
  start() {
    if (!this.isDateHasCome()) {
      this.render();
      this.updateClock = setInterval(this.render.bind(this), 1000);
    }
  }
  stop() {
    clearInterval(this.updateClock);
  }
  render() {
    let dateStop = new Date(this.deadLine).getTime();
    let dateNow = new Date().getTime();
    if (this.isDateHasCome(this.deadLine)) {
      this.stop();
    } else {
      const dateData = this.getTimeRemaining(dateStop, dateNow);
      Object.keys(this.format).forEach((key) => {
        this.format[key].textContent = this.getTwoDigitNumber(dateData[key]);

        if (key !== "seconds") {
          this.format[key].nextElementSibling.textContent = this.setSeparator(
            this.format[key],
            dateData[key],
            key
          );
        }
      });
    }
  }
  getTimeRemaining(dateStop, dateNow) {
    let timeRemaining = (dateStop - dateNow) / 1000;

    let days = Math.floor(timeRemaining / 60 / 60 / 24);
    let hours = Math.floor((timeRemaining / 60 / 60) % 24);
    let minutes = Math.floor((timeRemaining / 60) % 60);
    let seconds = Math.floor(timeRemaining % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
  getTwoDigitNumber(num) {
    return String(num).length === 1 ? `0${num}` : `${num}`;
  }
  isDateHasCome() {
    return new Date(this.deadLine).getTime() <= new Date().getTime();
  }
  setSeparator(element, num = null, key = null) {
    return this.separator !== "name"
      ? this.separator
      : this.getNameSeparator(num, key);
  }
  getNameSeparator(num, key) {
    const nounsList = {
      days: ["день", "дня", "дней"],
      hours: ["час", "часа", "часов"],
      minutes: ["минута", "минуты", "минут"],
      seconds: ["секунда", "секунды", "секунд"],
    };
    const numeralsWithNouns = (num, nouns) => {
      if (num === 1 || (num > 20 && +String(num)[1] === 1)) {
        return nouns[0];
      } else if (
        (num > 1 && num < 5) ||
        (num > 21 && +String(num)[1] > 1 && +String(num)[1] < 5)
      ) {
        return nouns[1];
      } else if (
        num === 0 ||
        (num > 4 && num < 21) ||
        (num > 21 && +String(num)[1] > 4) ||
        +String(num)[1] === 0
      ) {
        return nouns[2];
      }
    };
    return numeralsWithNouns(num, nounsList[key]);
  }
}
