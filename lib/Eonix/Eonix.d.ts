import Diff from "../Diff/Diff";
type DateInput = string | number | Date | Eonix;
type TimeZoneOffset = number;
type CloneOptions = {
  offset?: TimeZoneOffset | null;
};
type AddAmount = {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};
type AddDateAmount = {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
};
type AddTimeAmount = {
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};
/**
 * Eonix extends the native Date class to provide additional utility methods
 * for date manipulation, time zone conversions, and difference calculations.
 *
 * @since 1.0.0
 */
declare class Eonix extends Date {
  /**
   * Creates a sorted array of Eonix instances based on the given dates.
   *
   * @param {...(string | number | Date | Eonix)} dates - Dates to include in the sorting.
   *
   * @returns {Eonix[]} An array of Eonix instances sorted in ascending order.
   *
   * @example
   * const [date1, date2] = Eonix.sort('2023-01-01', '2023-06-30');
   * console.log(date1); // Tue Jan 01 2023 00:00:00 GMT+0000
   * console.log(date2); // Wed Jun 30 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  static sort(...dates: DateInput[]): Eonix[];
  /**
   * Calculates the difference between two dates with optional units.
   *
   * @param {string | number | Date | Eonix} start - First date.
   * @param {string | number | Date | Eonix} end - Second date.
   *
   * @returns {Diff} A Diff class for the date's differense manipulations
   *
   * @example
   * const diff = Eonix.diff('2023-01-01', '2023-06-30', { withWeeks: true, withMonths: true });
   * console.log(diff); // Diff
   *
   * @since 1.0.0
   */
  static diff(start: DateInput, end: DateInput): Diff;
  /**
   * Clones the current Eonix instance.
   *
   * @returns {Eonix} A new Eonix instance with the same date.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const clone = date.clone();
   * console.log(clone); // Tue Jan 01 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  clone({ offset }?: CloneOptions): Eonix;
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
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.add({ years: 1, months: 2, weeks: 3, days: 4, hours: 5, minutes: 6, seconds: 7, milliseconds: 8 });
   * console.log(result); // Wed Jan 08 2024 05:06:07 GMT+0000
   *
   * @since 1.0.0
   */
  add(amount: AddAmount): Eonix;
  /**
   * Adds a specific date amount to the current date.
   *
   * @param {Object} [amount] - Amount object.
   * @param {number} [amount.years=0] - Years value.
   * @param {number} [amount.months=0] - Months value.
   * @param {number} [amount.weeks=0] - Weeks value.
   * @param {number} [amount.days=0] - Days value.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.addDate({ years: 1, months: 2, weeks: 3, days: 4 });
   * console.log(result); // Wed Jan 08 2024 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addDate({ years, months, weeks, days }: AddDateAmount): Eonix;
  /**
   * Adds a specific time amount to the current date.
   *
   * @param {Object} [amount] - Amount object.
   * @param {number} [amount.hours=0] - Hours value.
   * @param {number} [amount.minutes=0] - Minutes value.
   * @param {number} [amount.seconds=0] - Seconds value.
   * @param {number} [amount.milliseconds=0] - Milliseconds value.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.addTime({ hours: 1, minutes: 2, seconds: 3, milliseconds: 4 });
   * console.log(result); // Tue Jan 01 2023 01:02:03 GMT+0000
   *
   * @since 1.0.0
   */
  addTime({ hours, minutes, seconds, milliseconds }: AddTimeAmount): Eonix;
  /**
   * Adds years to the current date.
   *
   * @param {number} [years] - Years value to add.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.addYears(1);
   * console.log(result); // Tue Jan 01 2024 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addYears(years: number): Eonix;
  /**
   * Adds months to the current date.
   *
   * @param {number} [months] - Months value to add.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.addMonths(1);
   * console.log(result); // Tue Feb 01 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addMonths(months: number): Eonix;
  /**
   * Adds weeks to the current date.
   *
   * @param {number} [weeks] - Weeks value to add.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.addWeeks(1);
   * console.log(result); // Tue Jan 08 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addWeeks(weeks: number): Eonix;
  /**
   * Adds days to the current date.
   *
   * @param {number} [days] - Days value to add.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.addDays(1);
   * console.log(result); // Tue Jan 02 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addDays(days: number): Eonix;
  /**
   * Adds hours to the current date.
   *
   * @param {number} [hours] - Hours value to add.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.addHours(1);
   * console.log(result); // Tue Jan 01 2023 01:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  addHours(hours: number): Eonix;
  /**
   * Adds minutes to the current date.
   *
   * @param {number} [minutes] - Minutes value to add.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.addMinutes(1);
   * console.log(result); // Tue Jan 01 2023 00:01:00 GMT+0000
   *
   * @since 1.0.0
   */
  addMinutes(minutes: number): Eonix;
  /**
   * Adds seconds to the current date.
   *
   * @param {number} [seconds] - Seconds value to add.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.addSeconds(1);
   * console.log(result); // Tue Jan 01 2023 00:00:01 GMT+0000
   *
   * @since 1.0.0
   */
  addSeconds(seconds: number): Eonix;
  /**
   * Adds milliseconds to the current date.
   *
   * @param {number} [milliseconds] - Milliseconds value to add.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.addMilliseconds(1);
   * console.log(result); // Tue Jan 01 2023 00:00:00.001 GMT+0000
   *
   * @since 1.0.0
   */
  addMilliseconds(milliseconds: number): Eonix;
  /**
   * Returns the day of the week for the current date.
   *
   * @returns {number} Day of the week (1-7).
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.getWeekday();
   * console.log(result); // 1
   *
   * @since 1.0.0
   */
  getWeekday(): number;
  /**
   * Returns the day of the year for the current date.
   *
   * @returns {number} Day of the year.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.getDayOfYear();
   * console.log(result); // 1
   *
   * @since 1.0.0
   */
  getDayOfYear(): number;
  /**
   * Returns the week number for the current date.
   *
   * @returns {number} Week number.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.getWeekNumber();
   * console.log(result); // 1
   *
   * @since 1.0.0
   */
  getWeekNumber(): number;
  /**
   * Checks if the current date is a leap year.
   *
   * @returns {boolean} True if the current date is a leap year, false otherwise.
   *
   * @example
   * const date = new Eonix('2020-01-01');
   * const result = date.isLeapYear();
   * console.log(result); // true
   *
   * @since 1.0.0
   */
  isLeapYear(): boolean;
  /**
   * Checks if the current date is UTC.
   *
   * @returns {boolean} True if the local date is UTC, false otherwise.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.isUTC();
   * console.log(result); // true
   *
   * @since 1.0.0
   */
  isUTC(): boolean;
  /**
   * Converts the current date to the same date and time in UTC.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.toUTC();
   * console.log(result); // Tue Jan 01 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  convertToUTC(): Eonix;
  /**
   * Converts the timezone offset of the current date.
   *
   * @param {number} newOffset - New timezone offset in hours.
   *
   * @returns {Eonix} A Eonix instance.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.convertToTimeZone(2);
   * console.log(result); // Tue Jan 01 2023 02:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  convertToTimeZone(newOffset: TimeZoneOffset): Eonix;
  /**
   * Converts the current date to a Date object.
   *
   * @returns {Date} A Date object.
   *
   * @example
   * const date = new Eonix('2023-01-01');
   * const result = date.toDate();
   * console.log(result); // Tue Jan 01 2023 00:00:00 GMT+0000
   *
   * @since 1.0.0
   */
  toDate(): Date;
}

export = Eonix;
