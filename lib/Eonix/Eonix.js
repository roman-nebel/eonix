class Eonix extends Date {
  static sort(...dates) {
    if (dates.length === 0)
      throw new Error("Nothing to sort. Provide two or more date arguments.");
    return [...dates.flat().map((date) => new Eonix(date))].sort(
      (a, b) => a.getTime() - b.getTime()
    );
  }

  static diff(start, end) {
    const Diff = require("../Diff/Diff.js");
    return new Diff(start, end);
  }

  clone({ offset = null } = {}) {
    const cloned = new Eonix(this);
    if (offset !== null) {
      cloned.convertToTimeZone(offset);
    }
    return cloned;
  }

  add(amount) {
    if (
      !amount ||
      typeof amount !== "object" ||
      Object.keys(amount).length === 0
    ) {
      throw new Error("The argument must be a non-empty object");
    }
    const {
      years = 0,
      months = 0,
      weeks = 0,
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0,
      milliseconds = 0,
    } = amount;

    if (
      !Object.values({
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
      }).every((value) => typeof value === "number")
    ) {
      throw new Error("All parameters must be numbers");
    }

    this.setUTCFullYear(this.getUTCFullYear() + years);
    this.setUTCMonth(this.getUTCMonth() + months);
    this.setUTCDate(this.getUTCDate() + weeks * 7 + days);
    this.setUTCHours(this.getUTCHours() + hours);
    this.setUTCMinutes(this.getUTCMinutes() + minutes);
    this.setUTCSeconds(this.getUTCSeconds() + seconds);
    this.setUTCMilliseconds(this.getUTCMilliseconds() + milliseconds);
    return this;
  }

  addDate({ years = 0, months = 0, weeks = 0, days = 0 }) {
    return this.add({ years, months, weeks, days });
  }

  addTime({ hours = 0, minutes = 0, seconds = 0, milliseconds = 0 }) {
    return this.add({ hours, minutes, seconds, milliseconds });
  }

  addYears(years) {
    return this.add({ years });
  }

  addMonths(months) {
    return this.add({ months });
  }

  addWeeks(weeks) {
    return this.add({ weeks });
  }

  addDays(days) {
    return this.add({ days });
  }

  addHours(hours) {
    return this.add({ hours });
  }

  addMinutes(minutes) {
    return this.add({ minutes });
  }

  addSeconds(seconds) {
    return this.add({ seconds });
  }

  addMilliseconds(milliseconds) {
    return this.add({ milliseconds });
  }

  getWeekday() {
    return ((this.getDay() + 6) % 7) + 1;
  }

  getDayOfYear() {
    const startOfYear = new Eonix(Eonix.UTC(this.getFullYear(), 0, 1));
    return Math.floor((this.getTime() - startOfYear.getTime()) / 86400000) + 1;
  }

  getWeekNumber() {
    const jan4 = new Eonix(Eonix.UTC(this.getFullYear(), 0, 4));

    const firstMonday = new Eonix(jan4);
    firstMonday.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() + 6) % 7));

    return Math.floor((this.getTime() - firstMonday.getTime()) / 604800000) + 1;
  }

  isLeapYear() {
    const year = this.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  isUTC() {
    return this.getTimezoneOffset() === 0;
  }

  convertToUTC() {
    const utcTime = this.getTime() + this.getTimezoneOffset() * 60000;
    this.setTime(utcTime);
    return this;
  }

  convertToTimeZone(newOffset) {
    this.setTime(this.getTime() - newOffset * 3600000);
    return this;
  }

  toDate() {
    return new Date(this);
  }
}

module.exports = Eonix;
