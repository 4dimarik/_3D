import { numeralsWithNouns, nounsList } from "../utils";

export default class Hello {
  constructor() {
    this.block = document.querySelector(".card-body");

    this.render();
  }
  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) {
      return "Доброй ночи!";
    } else if (hour >= 5 && hour < 12) {
      return "Доброе утро!";
    } else if (hour >= 12 && hour < 16) {
      return "Доброй день!";
    } else if (hour >= 16 && hour < 24) {
      return "Добрый вечер!";
    }
  }
  getTime(locale) {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date().toLocaleString(locale, options);
  }
  getDateTimeData() {
    let date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      monthLong: (() => {
        let month = new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(
          date
        );
        return (
          month.substring(0, 1).toUpperCase() +
          month.substring(1, month.length - 1).toLowerCase() +
          "я"
        );
      })(),
      weekDay: (() => {
        let weekDay = new Intl.DateTimeFormat("ru-RU", {
          weekday: "long",
        }).format(date);
        return (
          weekDay.substring(0, 1).toUpperCase() +
          weekDay.substring(1).toLowerCase()
        );
      })(),
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
  }
  getTimeRemaining(deadLine) {
    let dateStop = new Date(deadLine).getTime();
    let dateNow = new Date().getTime();
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
  untilNewYear() {
    let daysQuality = this.getTimeRemaining("2022-01-01").days;
    return `${daysQuality} ${numeralsWithNouns(daysQuality, nounsList.day)}`;
  }

  render() {
    this.block.innerHTML = `<h3>
${this.getTimeOfDay()}<br>
Сегодня: ${this.getDateTimeData().weekDay}<br>
${this.getTime("en-US")}<br>
До нового года осталось ${this.untilNewYear()}
</h3>
`;
  }
}
