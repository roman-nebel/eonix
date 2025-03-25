import Chronos from "./Cronos";

/**
 * Diff is an additional class for calculation between two dates.
 *
 * @version 1.0.0
 */
export default class Diff {
  constructor(start, end) {
    const startChronos = new Chronos(start);
    const endChronos = new Chronos(end);

    this.isInversed = startChronos > endChronos;

    const [earlierDate, laterDate] = Chronos.sort(startChronos, endChronos);

    this.start = earlierDate;
    this.end = laterDate;
  }

  /**
   * Calculates the difference between two dates in specific units.
   *
   * @param {Array<string>} units - Units of difference (years, months, weeks, days, hours, minutes, seconds, milliseconds).
   *
   * @returns {object} An object containing the difference in units between the two dates.
   *
   * @since 1.0.0
   */
  inUnits(units) {
    if (!units || !Array.isArray(units) || units.length === 0) {
      units = [
        "years",
        "months",
        "days",
        "hours",
        "minutes",
        "seconds",
        "milliseconds",
      ];
    }

    const tempDate = new Chronos(this.start);
    let diff = {};

    if (units.includes("years")) {
      const years = new Diff(tempDate, this.end).inYears();
      diff.years = years;
      tempDate.addYears(years);
    }

    if (units.includes("months")) {
      const months = new Diff(tempDate, this.end).inMonths();
      diff.months = months;
      tempDate.addMonths(months);
    }

    if (units.includes("weeks")) {
      const weeks = new Diff(tempDate, this.end).inWeeks();
      diff.weeks = weeks;
      tempDate.addWeeks(weeks);
    }

    if (units.includes("days")) {
      const days = new Diff(tempDate, this.end).inDays();
      diff.days = days;
      tempDate.addDays(days);
    }

    if (units.includes("hours")) {
      const hours = new Diff(tempDate, this.end).inHours();
      diff.hours = hours;
      tempDate.addHours(hours);
    }

    if (units.includes("minutes")) {
      const minutes = new Diff(tempDate, this.end).inMinutes();
      diff.minutes = minutes;
      tempDate.addMinutes(minutes);
    }

    if (units.includes("seconds")) {
      const seconds = new Diff(tempDate, this.end).inSeconds();
      diff.seconds = seconds;
      tempDate.addSeconds(seconds);
    }

    if (units.includes("milliseconds") || returns.length === 0) {
      const milliseconds = new Diff(tempDate, this.end).inMilliseconds();
      diff.milliseconds = milliseconds;
    }

    return diff;
  }

  /**
   * Calculates the difference between two dates in milliseconds.
   *
   * @param {Object} options - An object with parameters
   * @param {boolean} options.absolute - If true, returns absolute value of the diff.
   *
   * @returns {number} A number of full milliseconds between the two dates.
   *
   * @since 1.0.0
   */
  inMilliseconds({ absolute = false } = {}) {
    const milliseconds = Math.floor((this.end - this.start) / 1);
    return this.isInversed ?? !absolute ? -milliseconds : milliseconds;
  }

  /**
   * Calculates the difference between two dates in seconds.
   *
   * @param {Object} options - An object with parameters
   * @param {boolean} options.absolute - If true, returns absolute value of the diff.
   *
   * @returns {number} A number of full seconds between the two dates.
   *
   * @since 1.0.0
   */
  inSeconds({ absolute = false } = {}) {
    const seconds = Math.floor((this.end - this.start) / 1000);
    return this.isInversed ?? !absolute ? -seconds : seconds;
  }

  /**
   * Calculates the difference between two dates in minutes.
   *
   * @param {Object} options - An object with parameters
   * @param {boolean} options.absolute - If true, returns absolute value of the diff.
   *
   * @returns {number} A number of full minutes between the two dates.
   *
   * @since 1.0.0
   */
  inMinutes({ absolute = false } = {}) {
    const minutes = Math.floor((this.end - this.start) / 60000);
    return this.isInversed ?? !absolute ? -minutes : minutes;
  }

  /**
   * Calculates the difference between two dates in hours.
   *
   * @param {Object} options - An object with parameters
   * @param {boolean} options.absolute - If true, returns absolute value of the diff.
   *
   * @returns {number} A number of full hours between the two dates.
   *
   * @since 1.0.0
   */
  inHours({ absolute = false } = {}) {
    const hours = Math.floor((this.end - this.start) / 3600000);
    return this.isInversed ?? !absolute ? -hours : hours;
  }

  /**
   * Calculates the difference between two dates in days.
   *
   * @param {Object} options - An object with parameters
   * @param {boolean} options.absolute - If true, returns absolute value of the diff.
   *
   * @returns {number} A number of full days between the two dates.
   *
   * @since 1.0.0
   */
  inDays({ absolute = false } = {}) {
    const days = Math.floor((this.end - this.start) / 86400000);
    return this.isInversed ?? !absolute ? -days : days;
  }

  /**
   * Calculates the difference between two dates in weeks.
   *
   * @param {Object} options - An object with parameters
   * @param {boolean} options.absolute - If true, returns absolute value of the diff.
   *
   * @returns {number} A number of full weeks between the two dates.
   *
   * @since 1.0.0
   */
  inWeeks({ absolute = false } = {}) {
    const weeks = Math.floor((this.end - this.start) / 604800000);
    return this.isInversed ?? !absolute ? -weeks : weeks;
  }

  /**
   * Calculates the difference between two dates in months.
   *
   * @param {Object} options - An object with parameters
   * @param {boolean} options.absolute - If true, returns absolute value of the diff.
   *
   * @returns {number} A number of full months between the two dates.
   *
   * @since 1.0.0
   */
  inMonths({ absolute = false } = {}) {
    let years = this.inYears();
    let months = this.end.getMonth() - this.start.getMonth();

    if (
      this.start.isLeapYear() &&
      !this.end.isLeapYear() &&
      this.end.getMonth() === 1 &&
      this.end.getDate() === 28
    ) {
      months = 11;
    } else if (this.start.getDate() > this.end.getDate()) {
      months--;
    }

    if (months < 0) {
      years++;
    }

    const totaMonths = months + years * 12;

    return this.isInversed ?? !absolute ? -totaMonths : totaMonths;
  }

  /**
   * Calculates the difference between two dates in years.
   *
   * @param {Object} options - An object with parameters
   * @param {boolean} options.absolute - If true, returns absolute value of the diff.
   *
   * @returns {number} A number of full years between the two dates.
   *
   * @since 1.0.0
   */
  inYears({ absolute = false } = {}) {
    let years = this.end.getFullYear() - this.start.getFullYear();

    if (years === 0) return 0;

    const startAdjusted = new Date(
      Date.UTC(
        this.end.getFullYear(),
        this.start.getMonth(),
        this.start.getDate()
      )
    );

    if (startAdjusted > this.end) {
      years--;
    }

    return this.isInversed ?? !absolute ? -years : years;
  }
}
