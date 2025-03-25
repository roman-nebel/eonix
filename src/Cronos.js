import Diff from "./Diff";

/**
 * Chronos extends the native Date class to provide additional utility methods
 * for date manipulation, time zone conversions, and difference calculations.
 *
 * @version 1.0.0
 */
export default class Chronos extends Date {
  /**
   * Creates a sorted array of Chronos instances based on the given dates.
   *
   * @param {...(string | number | Date | Chronos)} dates - Dates to include in the sorting.
   *
   * @returns {Chronos[]} An array of Chronos instances sorted in ascending order.
   *
   * @example
   * const [date1, date2] = Chronos.sort('2023-01-01', '2023-06-30');
   * console.log(date1); // Tue Jan 01 2023 00:00:00 GMT+0000
   * console.log(date2); // Wed Jun 30 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  static sort(...dates) {
    if (dates.length === 0)
      throw new Error("Nothing to sort. Provide two or more date arguments.");
    return [...dates.flat().map((date) => new Chronos(date))].sort(
      (a, b) => a - b
    );
  }

  /**
   * Calculates the difference between two dates with optional units.
   *
   * @param {string | number | Date | Chronos} start - First date.
   * @param {string | number | Date | Chronos} end - Second date.
   *
   * @returns {Diff} A Diff class for the date's differense manipulations
   *
   * @example
   * const diff = Chronos.diff('2023-01-01', '2023-06-30', { withWeeks: true, withMonths: true });
   * console.log(diff); // Diff
   *
   * @since 1.0.0
   */
  static diff(start, end) {
    return new Diff(start, end);
  }

  /**
   * Clones the current Chronos instance.
   *
   * @returns {Chronos} A new Chronos instance with the same date.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const clone = date.clone();
   * console.log(clone); // Tue Jan 01 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  clone({ offset = null } = {}) {
    const cloned = new Chronos(this);
    if (offset !== null) {
      cloned.convertToTimeZone(offset);
    }
    return cloned;
  }

  /**
   * Generic method. Adds a specific amount to the current date.
   *
   * @param {Object} [amount] - Amount object.
   * @param {number} [amount.years=0] - Years value.
   * @param {number} [amount.months=0] - Months value.
   * @param {number} [amount.weeks=0] - Weeks value.
   * @param {number} [amount.days=0] - Days value.
   * @param {number} [amount.hours=0] - Hours value.
   * @param {number} [amount.minutes=0] - Minutes value.
   * @param {number} [amount.seconds=0] - Seconds value.
   * @param {number} [amount.milliseconds=0] - Milliseconds value.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.add({ years: 1, months: 2, weeks: 3, days: 4, hours: 5, minutes: 6, seconds: 7, milliseconds: 8 });
   * console.log(result); // Wed Jan 08 2024 05:06:07 GMT+0000
   *
   * @since 1.0.0
   */
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

  /**
   * Adds a specific date amount to the current date.
   *
   * @param {Object} [amount] - Amount object.
   * @param {number} [amount.years=0] - Years value.
   * @param {number} [amount.months=0] - Months value.
   * @param {number} [amount.weeks=0] - Weeks value.
   * @param {number} [amount.days=0] - Days value.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.addDate({ years: 1, months: 2, weeks: 3, days: 4 });
   * console.log(result); // Wed Jan 08 2024 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addDate({ years = 0, months = 0, weeks = 0, days = 0 }) {
    return this.add({ years, months, weeks, days });
  }

  /**
   * Adds a specific time amount to the current date.
   *
   * @param {Object} [amount] - Amount object.
   * @param {number} [amount.hours=0] - Hours value.
   * @param {number} [amount.minutes=0] - Minutes value.
   * @param {number} [amount.seconds=0] - Seconds value.
   * @param {number} [amount.milliseconds=0] - Milliseconds value.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.addTime({ hours: 1, minutes: 2, seconds: 3, milliseconds: 4 });
   * console.log(result); // Tue Jan 01 2023 01:02:03 GMT+0000
   *
   * @since 1.0.0
   */
  addTime({ hours = 0, minutes = 0, seconds = 0, milliseconds = 0 }) {
    return this.add({ hours, minutes, seconds, milliseconds });
  }

  /**
   * Adds years to the current date.
   *
   * @param {number} [years] - Years value to add.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.addYears(1);
   * console.log(result); // Tue Jan 01 2024 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addYears(years) {
    return this.add({ years });
  }

  /**
   * Adds months to the current date.
   *
   * @param {number} [months] - Months value to add.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.addMonths(1);
   * console.log(result); // Tue Feb 01 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addMonths(months) {
    return this.add({ months });
  }

  /**
   * Adds weeks to the current date.
   *
   * @param {number} [weeks] - Weeks value to add.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.addWeeks(1);
   * console.log(result); // Tue Jan 08 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addWeeks(weeks) {
    return this.add({ weeks });
  }

  /**
   * Adds days to the current date.
   *
   * @param {number} [days] - Days value to add.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.addDays(1);
   * console.log(result); // Tue Jan 02 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addDays(days) {
    return this.add({ days });
  }

  /**
   * Adds hours to the current date.
   *
   * @param {number} [hours] - Hours value to add.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.addHours(1);
   * console.log(result); // Tue Jan 01 2023 01:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addHours(hours) {
    return this.add({ hours });
  }

  /**
   * Adds minutes to the current date.
   *
   * @param {number} [minutes] - Minutes value to add.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.addMinutes(1);
   * console.log(result); // Tue Jan 01 2023 00:01:00 GMT+0000
   *
   * @since 1.0.0
   */
  addMinutes(minutes) {
    return this.add({ minutes });
  }

  /**
   * Adds seconds to the current date.
   *
   * @param {number} [seconds] - Seconds value to add.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.addSeconds(1);
   * console.log(result); // Tue Jan 01 2023 00:00:01 GMT+0000
   *
   * @since 1.0.0
   */
  addSeconds(seconds) {
    return this.add({ seconds });
  }

  /**
   * Adds milliseconds to the current date.
   *
   * @param {number} [milliseconds] - Milliseconds value to add.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.addMilliseconds(1);
   * console.log(result); // Tue Jan 01 2023 00:00:00.001 GMT+0000
   *
   * @since 1.0.0
   */
  addMilliseconds(milliseconds) {
    return this.add({ milliseconds });
  }

  /**
   * Returns the day of the week for the current date.
   *
   * @returns {number} Day of the week (1-7).
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.getWeekday();
   * console.log(result); // 1
   *
   * @since 1.0.0
   */
  getWeekday() {
    return ((this.getDay() + 6) % 7) + 1;
  }

  /**
   * Returns the day of the year for the current date.
   *
   * @returns {number} Day of the year.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.getDayOfYear();
   * console.log(result); // 1
   *
   * @since 1.0.0
   */
  getDayOfYear() {
    const startOfYear = new Chronos(Chronos.UTC(this.getFullYear(), 0, 1));
    return Math.floor((this.getTime() - startOfYear.getTime()) / 86400000) + 1;
  }

  /**
   * Returns the week number for the current date.
   *
   * @returns {number} Week number.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.getWeekNumber();
   * console.log(result); // 1
   *
   * @since 1.0.0
   */
  getWeekNumber() {
    const jan4 = new Chronos(Chronos.UTC(this.getFullYear(), 0, 4));

    const firstMonday = new Chronos(jan4);
    firstMonday.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() + 6) % 7));

    return Math.floor((this.getTime() - firstMonday.getTime()) / 604800000) + 1;
  }

  /**
   * Checks if the current date is a leap year.
   *
   * @returns {boolean} True if the current date is a leap year, false otherwise.
   *
   * @example
   * const date = new Chronos('2020-01-01');
   * const result = date.isLeapYear();
   * console.log(result); // true
   *
   * @since 1.0.0
   */
  isLeapYear() {
    const year = this.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  /**
   * Checks if the current date is UTC.
   *
   * @returns {boolean} True if the local date is UTC, false otherwise.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.isUTC();
   * console.log(result); // true
   *
   * @since 1.0.0
   */
  isUTC() {
    return this.getTimezoneOffset() === 0;
  }

  /**
   * Converts the current date to the same date and time in UTC.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.toUTC();
   * console.log(result); // Tue Jan 01 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  convertToUTC() {
    const utcTime = this.getTime() + this.getTimezoneOffset() * 60000;
    this.setTime(utcTime);
    return this;
  }

  /**
   * Converts the timezone offset of the current date.
   *
   * @param {number} newOffset - New timezone offset in hours.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.convertToTimeZone(2);
   * console.log(result); // Tue Jan 01 2023 02:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  convertToTimeZone(newOffset) {
    this.setTime(this.getTime() - newOffset * 3600000);
    return this;
  }

  /**
   * Converts the current date to a Date object.
   *
   * @returns {Date} A Date object.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.toDate();
   * console.log(result); // Tue Jan 01 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  toDate() {
    return new Date(this);
  }
}
