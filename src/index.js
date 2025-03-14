export default class Chronos extends Date {
  constructor(date) {
    super(date);
  }

  static createSortedDates(date1, date2, absolute) {
    return absolute
      ? [new Chronos(date1), new Chronos(date2)].sort()
      : [new Chronos(date1), new Chronos(date2)];
  }

  static getDiff(date1, date2, options = {}) {
    const { withWeeks = false, withMonths = true, absolute = false } = options;
    const [start, end] = Chronos.createSortedDates(date1, date2, absolute);

    let years = end.getFullYear() - start.getFullYear();
    let monthsCount = 0,
      weeksCount = 0,
      daysCount = 0;
    let tempDate = new Chronos(start);

    tempDate.setFullYear(tempDate.getFullYear() + years);
    if (tempDate > end) {
      years--;
      tempDate.setFullYear(tempDate.getFullYear() - 1);
    }

    if (withMonths) {
      while (tempDate <= end) {
        tempDate.setMonth(tempDate.getMonth() + 1);
        if (tempDate > end) break;
        monthsCount++;
      }
    }

    if (withWeeks) {
      daysCount = Math.floor((end - tempDate) / (1000 * 60 * 60 * 24));
      weeksCount = Math.floor(daysCount / 7);
      daysCount %= 7;
      tempDate.setDate(tempDate.getDate() + weeksCount * 7 + daysCount);
    } else if (!withMonths) {
      daysCount = Math.floor((end - tempDate) / (1000 * 60 * 60 * 24));
      tempDate.setDate(tempDate.getDate() + daysCount);
    }

    const diffMs = end - tempDate;
    return {
      years,
      months: withMonths ? monthsCount : undefined,
      weeks: withWeeks ? weeksCount : undefined,
      days: daysCount,
      hours: Math.floor(diffMs / (1000 * 60 * 60)),
      minutes: Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diffMs % (1000 * 60)) / 1000),
      milliseconds: diffMs % 1000,
    };
  }

  static getDiffInUnits(date1, date2, unit, absolute = false) {
    const [start, end] = Chronos.createSortedDates(date1, date2, absolute);
    const unitMs = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 60000,
      hours: 3600000,
      days: 86400000,
      weeks: 604800000,
    }[unit];
    return Math.abs(Math.floor((end - start) / unitMs));
  }

  static getDiffInMilliseconds(date1, date2, options = {}) {
    return Chronos.getDiffInUnits(
      date1,
      date2,
      "milliseconds",
      options.absolute
    );
  }
  static getDiffInSeconds(date1, date2, options = {}) {
    return Chronos.getDiffInUnits(date1, date2, "seconds", options.absolute);
  }
  static getDiffInMinutes(date1, date2, options = {}) {
    return Chronos.getDiffInUnits(date1, date2, "minutes", options.absolute);
  }
  static getDiffInHours(date1, date2, options = {}) {
    return Chronos.getDiffInUnits(date1, date2, "hours", options.absolute);
  }
  static getDiffInDays(date1, date2, options = {}) {
    return Chronos.getDiffInUnits(date1, date2, "days", options.absolute);
  }
  static getDiffInWeeks(date1, date2, options = {}) {
    return Chronos.getDiffInUnits(date1, date2, "weeks", options.absolute);
  }

  static getDiffInMonths(date1, date2, options = {}) {
    const { years, months } = Chronos.getDiff(date1, date2, options);
    return years * 12 + (months || 0);
  }

  static getDiffInYears(date1, date2, options = {}) {
    return Chronos.getDiff(date1, date2, options).years;
  }

  clone() {
    return new Chronos(this);
  }

  add({
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  }) {
    this.setFullYear(this.getFullYear() + years);
    this.setMonth(this.getMonth() + months);
    this.setDate(this.getDate() + weeks * 7 + days);
    this.setHours(this.getHours() + hours);
    this.setMinutes(this.getMinutes() + minutes);
    this.setSeconds(this.getSeconds() + seconds);
    this.setMilliseconds(this.getMilliseconds() + milliseconds);
    return this;
  }

  setTimeZoneOffset(newOffset) {
    return new Chronos(
      this.getTime() + (newOffset + this.getTimezoneOffset() / 60) * 3600000
    );
  }

  convertToTimeZone(newOffset) {
    return new Chronos(
      this.getTime() - this.getTimezoneOffset() * 60000 + newOffset * 3600000
    );
  }

  getWeekday() {
    return ((this.getDay() + 6) % 7) + 1;
  }

  getDayOfYear() {
    return Math.floor(
      (this - new Chronos(this.getFullYear(), 0, 0)) / 86400000
    );
  }

  getWeekNumber() {
    const firstThursday = new Chronos(
      this.getFullYear(),
      0,
      1 + ((4 - new Chronos(this.getFullYear(), 0, 1).getDay() + 7) % 7)
    );
    return Math.floor((this - firstThursday) / 604800000) + 1;
  }

  isLeapYear() {
    const year = this.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  isUTC() {
    return this.getTimezoneOffset() === 0;
  }

  toUTC() {
    return new Chronos(this.getTime() + this.getTimezoneOffset() * 60000);
  }

  toDate() {
    return new Date(this);
  }
}
