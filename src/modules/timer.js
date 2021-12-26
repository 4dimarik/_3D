import { numeralsWithNouns } from "../utils";
import { deadLine, nounsList } from "./config";

export default class Timer {
  constructor(withWords) {
    this.withWords = true;
    this.timer = document.querySelector("#timer");
    this.timerDays = this.timer.querySelector("#timer-days");
    this.timerHours = this.timer.querySelector("#timer-hours");
    this.timerMinutes = this.timer.querySelector("#timer-minutes");
    this.timerSeconds = this.timer.querySelector("#timer-seconds");

    if (withWords) {
      this.timerDaysAfter = this.timer.querySelector("#timer-days-after");
      this.timerHoursAfter = this.timer.querySelector("#timer-hours-after");
      this.timerMinutesAfter = this.timer.querySelector("#timer-minutes-after");
      this.timerSecondsAfter = this.timer.querySelector("#timer-seconds-after");
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
  isDayHasCome() {
    return new Date(deadLine).getTime() <= new Date().getTime();
  }
  render() {
    let dateStop = new Date(deadLine).getTime();
    let dateNow = new Date().getTime();
    if (this.isDayHasCome(deadLine)) {
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
