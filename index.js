/**
 * Chronos extends the native Date class to provide additional utility methods
 * for date manipulation, time zone conversions, and difference calculations.
 *
 * @version 1.0.0
 */
class Chronos extends Date {
  /**
   * Creates a sorted array of Chronos instances based on the given dates.
   *
   * @param {string | number | Date} date1 - First date.
   * @param {string | number | Date} date2 - Second date.
   * @param {...(string | number | Date)} dates - Additional dates to include in the sorting.
   *
   * @returns {Chronos[]} An array of Chronos instances sorted in ascending order.
   *
   * @example
   * const [date1, date2] = Chronos.createSortedDates('2023-01-01', '2023-06-30', false);
   * console.log(date1); // Tue Jan 01 2023 00:00:00 GMT+0000
   * console.log(date2); // Wed Jun 30 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  static createSortedDates(date1, date2, ...dates) {
    return [
      new Chronos(date1),
      new Chronos(date2),
      ...dates.map((date) => new Chronos(date)),
    ].sort((a, b) => a - b);
  }

  /**
   * Calculates the difference between two dates with optional units.
   *
   * @param {string | number | Date} date1 - First date.
   * @param {string | number | Date} date2 - Second date.
   * @param {Object} [options] - Calculation options.
   * @param {boolean} [options.withWeeks=false] - Include weeks in calculation.
   * @param {boolean} [options.withMonths=true] - Include months in calculation.
   *
   * @returns {{ years: number, months?: number, weeks?: number, days: number, hours: number, minutes: number, seconds: number, milliseconds: number }}
   *
   * @example
   * const diff = Chronos.getDiff('2023-01-01', '2023-06-30', { withWeeks: true, withMonths: true });
   * console.log(diff); // { years: 0, months: 5, weeks: 5, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
   *
   * @since 1.0.0
   */
  static getDiff(date1, date2, options = {}) {
    const { withWeeks = false, withMonths = true } = options;
    const [start, end] = Chronos.createSortedDates(date1, date2);

    let years = end.getFullYear() - start.getFullYear();
    let tempDate = new Chronos(start);

    // Special case: Leap year issue (Feb 29 -> Feb 28)
    const leapYearCorrection =
      start.getMonth() === 1 &&
      start.getDate() === 29 &&
      years > 0 &&
      !end.isLeapYear();

    tempDate.setFullYear(tempDate.getFullYear() + years);

    if (tempDate > end) {
      years--;
      tempDate.setFullYear(tempDate.getFullYear() - 1);
    }

    let months = 0;
    if (withMonths) {
      let startYear = tempDate.getFullYear();
      let endYear = end.getFullYear();
      let startMonth = tempDate.getMonth();
      let endMonth = end.getMonth();

      months = (endYear - startYear) * 12 + (endMonth - startMonth);

      tempDate.setMonth(tempDate.getMonth() + months);

      if (tempDate > end) {
        months--;
        tempDate.setMonth(tempDate.getMonth() - 1);
      }
    }

    let daysCount = Math.floor((end - tempDate) / (1000 * 60 * 60 * 24));
    let weeksCount = 0;
    if (withWeeks) {
      weeksCount = Math.floor(daysCount / 7);
      daysCount %= 7;
    }
    tempDate = new Chronos(
      Date.UTC(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        tempDate.getDate() + weeksCount * 7 + daysCount
      )
    );

    const startOffset = tempDate.getTimezoneOffset();
    const endOffset = end.getTimezoneOffset();
    const dstShift = startOffset - endOffset;

    const diffMs = Math.abs(end - tempDate);
    return {
      years,
      months: withMonths ? months : undefined,
      weeks: withWeeks ? weeksCount : undefined,
      days: daysCount + (leapYearCorrection ? 1 : 0),
      hours:
        (Math.floor(diffMs / (1000 * 60 * 60)) % 24) +
        (dstShift === 60 ? 1 : 0),
      minutes: Math.floor((diffMs / (1000 * 60)) % 60),
      seconds: Math.floor((diffMs / 1000) % 60),
      milliseconds: diffMs % 1000,
    };
  }

  /**
   * Generic method. Calculates the difference between two dates in a specific unit.
   *
   * @param {string | number | Date | Chronos} start - First date.
   * @param {string | number | Date | Chronos} end - Second date.
   * @param {"milliseconds" | "seconds" | "minutes" | "hours" | "days" | "weeks"} unit - Unit of difference (milliseconds, seconds, minutes, hours, days, weeks).
   *
   * @returns {number} A number of units between the two dates.
   *
   * @example
   * const diff = Chronos.getDiffInUnits('2023-01-01', '2023-06-30', 'days');
   * console.log(diff); // 90
   *
   * @since 1.0.0
   */
  static getDiffInUnits(start, end, unit) {
    start = new Chronos(start);
    end = new Chronos(end);
    const unitMs = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 60000,
      hours: 3600000,
      days: 86400000,
      weeks: 604800000,
    }[unit];
    return Math.floor((end - start) / unitMs);
  }

  /**
   * Calculates the difference between two dates in milliseconds.
   *
   * @param {string | number | Date} date1 - First date.
   * @param {string | number | Date} date2 - Second date.
   * @param {Object} [options] - Calculation options.
   *
   * @returns {Chronos} A new Chronos instance with the same date.
   *
   * @example
   * const diff = Chronos.getDiffInMilliseconds('2023-01-01', '2023-06-30');
   * console.log(diff); // 15552000000
   *
   * @since 1.0.0
   */
  static getDiffInMilliseconds(date1, date2, options = {}) {
    return Chronos.getDiffInUnits(
      date1,
      date2,
      "milliseconds",
      options.absolute
    );
  }

  /**
   * Calculates the difference between two dates in seconds.
   *
   * @param {string | number | Date} date1 - First date.
   * @param {string | number | Date} date2 - Second date.
   * @param {Object} [options] - Calculation options.
   * @param {boolean} [options.absolute=false] - Return absolute values.
   *
   * @returns {Chronos} A new Chronos instance with the same date.
   *
   * @example
   * const diff = Chronos.getDiffInSeconds('2023-01-01', '2023-06-30');
   * console.log(diff); // 15552000
   *
   * @since 1.0.0
   */
  static getDiffInSeconds(date1, date2, options = {}) {
    return Chronos.getDiffInUnits(date1, date2, "seconds", options.absolute);
  }

  /**
   * Calculates the difference between two dates in minutes.
   *
   * @param {string | number | Date} date1 - First date.
   * @param {string | number | Date} date2 - Second date.
   * @param {Object} [options] - Calculation options.
   * @param {boolean} [options.absolute=false] - Return absolute values.
   *
   * @returns {Chronos} A new Chronos instance with the same date.
   *
   * @example
   * const diff = Chronos.getDiffInMinutes('2023-01-01', '2023-06-30');
   * console.log(diff); // 100800
   *
   * @since 1.0.0
   */
  static getDiffInMinutes(date1, date2, options = {}) {
    return Chronos.getDiffInUnits(date1, date2, "minutes", options.absolute);
  }

  /**
   * Calculates the difference between two dates in hours.
   *
   * @param {string | number | Date} date1 - First date.
   * @param {string | number | Date} date2 - Second date.
   * @param {Object} [options] - Calculation options.
   * @param {boolean} [options.absolute=false] - Return absolute values.
   *
   * @returns {Chronos} A new Chronos instance with the same date.
   *
   * @example
   * const diff = Chronos.getDiffInHours('2023-01-01', '2023-06-30');
   * console.log(diff); // 2160
   *
   * @since 1.0.0
   */
  static getDiffInHours(date1, date2, options = {}) {
    return Chronos.getDiffInUnits(date1, date2, "hours", options.absolute);
  }

  /**
   * Calculates the difference between two dates in days.
   *
   * @param {string | number | Date} date1 - First date.
   * @param {string | number | Date} date2 - Second date.
   * @param {Object} [options] - Calculation options.
   * @param {boolean} [options.absolute=false] - Return absolute values.
   *
   * @returns {Chronos} A new Chronos instance with the same date.
   *
   * @example
   * const diff = Chronos.getDiffInDays('2023-01-01', '2023-06-30');
   * console.log(diff); // 90
   *
   * @since 1.0.0
   */
  static getDiffInDays(date1, date2, options = {}) {
    return Chronos.getDiffInUnits(date1, date2, "days", options.absolute);
  }

  /**
   * Calculates the difference between two dates in weeks.
   *
   * @param {string | number | Date | Chronos} start - First date.
   * @param {string | number | Date | Chronos} end - Second date.
   *
   * @returns {number} A number of full weeks between the two dates.
   *
   * @example
   * const diff = Chronos.getDiffInWeeks('2023-01-01', '2023-06-30');
   * console.log(diff); // 13
   *
   * @since 1.0.0
   */
  static getDiffInWeeks(start, end) {
    return Chronos.getDiffInUnits(start, end, "weeks");
  }

  /**
   * Calculates the difference between two dates in months.
   *
   * @param {string | number | Date | Chronos} start - First date.
   * @param {string | number | Date | Chronos} end - Second date.
   *
   * @returns {number} A number of full months between the two dates.
   *
   * @example
   * const diff = Chronos.getDiffInMonths('2023-01-01', '2023-06-30');
   * console.log(diff); // 5
   *
   * @since 1.0.0
   */
  static getDiffInMonths(start, end) {
    start = new Chronos(start);
    end = new Chronos(end);
    let years = this.getDiffInYears(start, end);
    let months = end.getMonth() - start.getMonth();

    if (
      start.isLeapYear() &&
      !end.isLeapYear() &&
      end.getMonth() === 1 &&
      end.getDate() === 28
    ) {
      months = 11;
    } else if (start.getDate() > end.getDate()) {
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    return months + years * 12;
  }

  /**
   * Calculates the difference between two dates in years.
   *
   * @param {string | number | Date | Chronos} start - First date.
   * @param {string | number | Date | Chronos} end - Second date.
   *
   * @returns {number} A number of full years between the two dates.
   *
   * @example
   * const diff = Chronos.getDiffInYears('2023-01-01', '2023-06-30');
   * console.log(diff); // 0
   *
   * @since 1.0.0
   */
  static getDiffInYears(start, end) {
    start = new Chronos(start);
    end = new Chronos(end);
    let years = end.getFullYear() - start.getFullYear();

    const startAdjusted = new Chronos(
      end.getFullYear(),
      start.getMonth(),
      start.getDate()
    );

    if (startAdjusted > end) {
      years--;
    }

    if (
      start.getMonth() === 1 &&
      start.getDate() === 29 &&
      end.getMonth() === 1 &&
      end.getDate() === 28 &&
      !end.isLeapYear()
    ) {
      years--;
    }

    return years;
  }

  /**
   * @param {string | number | Date} date - The date value to initialize Chronos.
   */
  constructor(date) {
    super(date);
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
  clone() {
    return new Chronos(this);
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
   * Sets the timezone offset of the current date.
   *
   * @param {number} newOffset - New timezone offset in hours.
   *
   * @returns {Chronos} A Chronos instance.
   *
   * @example
   * const date = new Chronos('2023-01-01');
   * const result = date.setTimeZoneOffset(2);
   * console.log(result); // Tue Jan 01 2023 02:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  setTimeZoneOffset(newOffset) {
    return new Chronos(
      this.getTime() + (newOffset + this.getTimezoneOffset() / 60) * 3600000
    );
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
    return new Chronos(
      this.getTime() - this.getTimezoneOffset() * 60000 + newOffset * 3600000
    );
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
    return Math.floor(
      (this - new Chronos(this.getFullYear(), 0, 0)) / 86400000
    );
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
    const firstThursday = new Chronos(
      this.getFullYear(),
      0,
      1 + ((4 - new Chronos(this.getFullYear(), 0, 1).getDay() + 7) % 7)
    );
    return Math.floor((this - firstThursday) / 604800000) + 1;
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
   * @returns {boolean} True if the current date is UTC, false otherwise.
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
   * Converts the current date to UTC.
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
  toUTC() {
    return new Chronos(this.getTime() + this.getTimezoneOffset() * 60000);
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

module.exports = Chronos;
