import { numeralsWithNouns } from "../utils";
import { deadLine } from "./config";

const nounsList = {
  day: ["день", "дня", "дней"],
  hour: ["час", "часа", "часов"],
  minute: ["минута", "минуты", "минут"],
  second: ["секунда", "секунды", "секунд"],
};
export default class Timer {
  constructor(withWords) {
    this.withWords = true;
    this.timerDays = document.querySelector("#timer-days");
    this.timerHours = document.querySelector("#timer-hours");
    this.timerMinutes = document.querySelector("#timer-minutes");
    this.timerSeconds = document.querySelector("#timer-seconds");

    if (withWords) {
      this.timerDaysAfter = document.querySelector("#timer-days-after");
      this.timerHoursAfter = document.querySelector("#timer-hours-after");
      this.timerMinutesAfter = document.querySelector("#timer-minutes-after");
      this.timerSecondsAfter = document.querySelector("#timer-seconds-after");
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
  isDayHasCome(
    dateStop = new Date(deadLine).getTime(),
    dateNow = new Date().getTime()
  ) {
    return dateStop <= dateNow;
  }
  render() {
    let dateStop = new Date(deadLine).getTime();
    let dateNow = new Date().getTime();
    if (this.isDayHasCome(dateStop, dateNow)) {
      this.stop();
    } else {
      const { days, hours, minutes, seconds } = this.getTimeRemaining(
        dateStop,
        dateNow
      );
      this.timerDays.textContent = this.getTwoDigitNumber(days);
      this.timerHours.textContent = this.getTwoDigitNumber(hours);
      this.timerMinutes.textContent = this.getTwoDigitNumber(minutes);
      this.timerSeconds.textContent = this.getTwoDigitNumber(seconds);
      if (this.withWords) {
        this.timerDaysAfter.textContent = numeralsWithNouns(
          days,
          nounsList.day
        );
        this.timerHoursAfter.textContent = numeralsWithNouns(
          hours,
          nounsList.hour
        );
        this.timerMinutesAfter.textContent = numeralsWithNouns(
          minutes,
          nounsList.minute
        );
        this.timerSecondsAfter.textContent = numeralsWithNouns(
          seconds,
          nounsList.second
        );
      }
    }
  }
  start() {
    if (!this.isDayHasCome()) {
      this.updateClock = setInterval(this.render.bind(this), 1000);
    }
  }
  stop() {
    clearInterval(this.updateClock);
  }
}
