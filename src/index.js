export default class Chronos extends Date {
  constructor(date) {
    super(date);
  }

  static getDiff(date1, date2, options = {}) {
    const { withWeeks = false, withMonths = true, absolute = false } = options;

    const [start, end] = absolute ? [date1, date2].sort() : [date1, date2];

    let years = end.getFullYear() - start.getFullYear();
    let monthsCount = 0;
    let weeksCount = 0;
    let daysCount = 0;

    let tempDate = new Date(start);

    tempDate.setFullYear(start.getFullYear() + years);
    if (tempDate > end) {
      years--;
      tempDate.setFullYear(tempDate.getFullYear() - 1);
    }

    if (withMonths) {
      while (tempDate <= end) {
        let nextMonth = new Date(tempDate);
        nextMonth.setMonth(tempDate.getMonth() + 1);
        if (nextMonth > end) break;
        tempDate = nextMonth;
        monthsCount++;
      }
    }

    if (withWeeks) {
      let remainingDays = Math.floor((end - tempDate) / (1000 * 60 * 60 * 24));
      weeksCount = Math.floor(remainingDays / 7);
      daysCount = remainingDays % 7;
      tempDate.setDate(tempDate.getDate() + weeksCount * 7 + daysCount);
    }

    if (!withMonths && !withWeeks) {
      daysCount = Math.floor((end - tempDate) / (1000 * 60 * 60 * 24));
      tempDate.setDate(tempDate.getDate() + daysCount);
    }

    let diffMs = end - tempDate;
    let hours = Math.floor(diffMs / (1000 * 60 * 60));
    diffMs -= hours * 1000 * 60 * 60;

    let minutes = Math.floor(diffMs / (1000 * 60));
    diffMs -= minutes * 1000 * 60;

    let seconds = Math.floor(diffMs / 1000);
    let milliseconds = diffMs - seconds * 1000;

    return {
      years,
      months: months ? monthsCount : undefined,
      weeks: weeks ? weeksCount : undefined,
      days: daysCount,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
  }

  getRelativeDiff(date1, date2, { absolute = false } = {}) {
    const [start, end] = absolute ? [date1, date2].sort() : [date1, date2];

    return {
      years: end.getFullYear() - start.getFullYear(),
      months: end.getMonth() - start.getMonth(),
      dates: end.getDate() - start.getDate(),
      hours: end.getHours() - start.getHours(),
      minutes: end.getMinutes() - start.getMinutes(),
      seconds: end.getSeconds() - start.getSeconds(),
      milliseconds: end.getMilliseconds() - start.getMilliseconds(),
    };
  }

  static getDiffInMilliseconds(date1, date2, { absolute = false } = {}) {
    const [start, end] = absolute ? [date1, date2].sort() : [date1, date2];
    return Math.abs(Math.floor(end - start));
  }

  static getDiffInSeconds(date1, date2, { absolute = false } = {}) {
    const [start, end] = absolute ? [date1, date2].sort() : [date1, date2];
    return Math.abs(Math.floor((end - start) / 1000));
  }

  static getDiffInMinutes(date1, date2, { absolute = false } = {}) {
    const [start, end] = absolute ? [date1, date2].sort() : [date1, date2];
    const oneMinuteMs = 1000 * 60;
    return Math.abs(Math.floor((end - start) / oneMinuteMs));
  }

  static getDiffInHours(date1, date2, { absolute = false } = {}) {
    const [start, end] = absolute ? [date1, date2].sort() : [date1, date2];
    const oneHourMs = 1000 * 60 * 60;
    return Math.abs(Math.floor((end - start) / oneHourMs));
  }

  static getDiffInDays(date1, date2, { absolute = false } = {}) {
    const [start, end] = absolute ? [date1, date2].sort() : [date1, date2];
    const oneDayMs = 1000 * 60 * 60 * 24;
    return Math.abs(Math.floor((end - start) / oneDayMs));
  }

  static getDiffInWeeks(date1, date2, { absolute = false } = {}) {
    const [start, end] = absolute ? [date1, date2].sort() : [date1, date2];
    const oneWeekMs = 1000 * 60 * 60 * 24 * 7;
    return Math.abs(Math.floor((end - start) / oneWeekMs));
  }

  static getDiffInMonths(date1, date2, { absolute = false } = {}) {
    const [start, end] = absolute ? [date1, date2].sort() : [date1, date2];
    const { years, months } = this.getDiff(start, end);
    return years * 12 + months;
  }

  static getDiffInYears(date1, date2, { absolute = false } = {}) {
    const [start, end] = absolute ? [date1, date2].sort() : [date1, date2];
    const { years } = this.getDiff(start, end);
    return years;
  }

  clone() {
    return new Chronos(this);
  }

  addYears(years) {
    this.setFullYear(this.getFullYear() + years);
    return this;
  }

  addMonths(months) {
    this.setMonth(this.getMonth() + months);
    return this;
  }

  addDays(days) {
    this.setDate(this.getDate() + days);
    return this;
  }

  addHours(hours) {
    this.setHours(this.getHours() + hours);
    return this;
  }

  addMinutes(minutes) {
    this.setMinutes(this.getMinutes() + minutes);
    return this;
  }

  addSeconds(seconds) {
    this.setSeconds(this.getSeconds() + seconds);
    return this;
  }

  addMilliseconds(milliseconds) {
    this.setMilliseconds(this.getMilliseconds() + milliseconds);
    return this;
  }

  addDate({ years = 0, months = 0, weeks = 0, days = 0 }) {
    this.setFullYear(this.getFullYear() + years);
    this.setMonth(this.getMonth() + months);
    this.setDate(this.getDate() + weeks * 7 + days);
    return this;
  }

  addTime({ hours = 0, minutes = 0, seconds = 0, milliseconds = 0 }) {
    this.setHours(this.getHours() + hours);
    this.setMinutes(this.getMinutes() + minutes);
    this.setSeconds(this.getSeconds() + seconds);
    this.setMilliseconds(this.getMilliseconds() + milliseconds);
    return this;
  }

  addDateTime({
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  }) {
    this.addDate({ years, months, weeks, days });
    this.addTime({ hours, minutes, seconds, milliseconds });
    return this;
  }

  getWeekday() {
    return ((this.getDay() + 6) % 7) + 1;
  }

  getDayOfYear() {
    const startOfYear = new Date(this.getFullYear(), 0, 0);
    return Math.floor((this - startOfYear) / (1000 * 60 * 60 * 24));
  }

  getWeekNumber() {
    const yearStart = new Date(this.getFullYear(), 0, 1);
    const firstThursday = new Date(
      this.getFullYear(),
      0,
      1 + ((4 - yearStart.getDay() + 7) % 7)
    );
    const daysDiff = Math.floor((this - firstThursday) / (1000 * 60 * 60 * 24));
    return Math.floor(daysDiff / 7) + 1;
  }

  getFullWeeksSinceYearStart() {
    const startOfYear = new Date(this.getFullYear(), 0, 1);
    const dayOffset = (startOfYear.getDay() + 6) % 7;
    const daysSinceYearStart = Math.floor(
      (this - startOfYear) / (1000 * 60 * 60 * 24)
    );
    return Math.floor((daysSinceYearStart - dayOffset) / 7);
  }

  isLeapYear() {
    const year = this.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  isUTC() {
    return this.getTimezoneOffset() === 0;
  }

  isLocal() {
    return this.getTimezoneOffset() !== 0;
  }

  toUTC() {
    const utc = new Date(this.getTime());
    utc.setMinutes(utc.getMinutes() + utc.getTimezoneOffset());
    return utc;
  }

  toLocal() {
    const local = new Date(this.getTime());
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local;
  }
}
