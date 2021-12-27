export default class Timer {
  /**
   *
   * @param {string} deadLine - Целевая отметка времени
   * @param {string} timerSelector - разделитель
   * @param {object} format - составные части временной отметки. Объект css селекторов
   * @param {boolean} doubleZero - добавлять 0 если число < 10
   * @param {string } separator - разделитель между составными части временной отметки
   */
  constructor({
    deadLine = "2021-12-27T18:35:00",
    timerSelector,
    format = {},
    doubleZero = true,
    separator = ":",
  }) {
    this.timerSelector = timerSelector;
    this.formatSelectors = format;
    this.separator = separator;
    this.deadLine = deadLine;
    this.doubleZero = doubleZero;
    this.init();
  }

  /**
   *  Метод инициализации получает элеменыты DOM в которые будут выводиться
   *  составными части временной отметки
   */
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

  /**
   *  Запуск таймера.
   *  Метод предварительно проверяет не наступила ли целевая отметка времени.
   *  Если нет запускается интервал обновления времени = 1 сек
   */
  start() {
    if (!this.isDateHasCome()) {
      this.handle();
      this.updateClock = setInterval(this.handle.bind(this), 1000);
    } else {
      this.render({
        days: "0",
        hours: "0",
        minutes: "0",
        seconds: "0",
      });
    }
  }

  /**
   * Метод остановки таймера
   */
  stop() {
    clearInterval(this.updateClock);
  }

  /**
   * Метод отрисовки временной метки в DOM
   *
   * @param {object} dateData - параметры текущей временной метки
   */
  render(dateData) {
    Object.keys(this.format).forEach((key) => {
      this.format[key].textContent = this.doubleZero
        ? this.getTwoDigitNumber(dateData[key])
        : dateData[key];
      this.format[key].nextElementSibling.textContent = this.setSeparator(
        dateData[key],
        key
      );
    });
  }

  /**
   *  Метод проверяет не наступила ли целевая метка времени.
   *  Если да таймер останавливается
   *  Если нет получаются данные текущего времени и запускается метод render
   */
  handle() {
    if (this.isDateHasCome()) {
      this.stop();
    } else {
      let dateStop = new Date(this.deadLine).getTime();
      let dateNow = new Date().getTime();
      const dateData = this.getTimeRemaining(dateStop, dateNow);
      this.render(dateData);
    }
  }

  /**
   * Метод вычисляет разницу во времени и возвращает объект составных частей времени
   *
   * @param {number} dateStop - числовае значение времени .getTime()
   * @param {number} dateNow - числовае значение времени .getTime()
   * @returns {{hours: number, seconds: number, minutes: number, days: number}}
   */
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

  /**
   * Метод возвращает строку с добавление 0 если число < 10
   *
   * @param num - число
   * @returns {string}
   */
  getTwoDigitNumber(num) {
    return String(num).length === 1 ? `0${num}` : `${num}`;
  }

  /**
   * Метод определяет наступила ли целевая дата
   * @returns {boolean}
   */
  isDateHasCome() {
    return new Date(this.deadLine).getTime() <= new Date().getTime();
  }

  /**
   * Метод определяет разделитель
   *
   * @param num - количество аттрибута времени
   * @param key - имя аттрибута времени
   * @returns {string} - строка представляющая разделитель атрибутов времени
   */
  setSeparator(num = null, key = "") {
    let separator = "";
    if (this.separator === "name") {
      separator = this.getNameSeparator(num, key);
    } else if (key !== "seconds") {
      separator = this.separator;
    }

    return separator;
  }

  /**
   * Метод для склонение наименовая атрибута времеи
   *
   * @param num - количество аттрибута времени
   * @param key - имя аттрибута времени
   * @returns {string}
   */
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
    return numeralsWithNouns(+num, nounsList[key]);
  }
}
