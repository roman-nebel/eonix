import Eonix from "../Eonix/Eonix";
type Unit =
  | "years"
  | "months"
  | "weeks"
  | "days"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds";
type DiffOptions = {
  absolute?: boolean;
};
type DiffUnits = Unit[];
type DiffResult = Partial<Record<Unit, number>>;
/**
 * Diff is an additional class for calculation between two dates.
 *
 * @since 1.0.0
 */
declare class Diff {
  private isInversed;
  private start;
  private end;
  constructor(
    start: string | number | Date | Eonix,
    end: string | number | Date | Eonix
  );
  /**
   * Calculates the difference between two dates in specific units.
   *
   * @param {Array<string>} units - Units of difference (years, months, weeks, days, hours, minutes, seconds, milliseconds).
   *
   * @returns {object} An object containing the difference in units between the two dates.
   *
   * @since 1.0.0
   */
  inUnits(units?: DiffUnits): DiffResult;
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
  inMilliseconds({ absolute }?: DiffOptions): number;
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
  inSeconds({ absolute }?: DiffOptions): number;
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
  inMinutes({ absolute }?: DiffOptions): number;
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
  inHours({ absolute }?: DiffOptions): number;
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
  inDays({ absolute }?: DiffOptions): number;
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
  inWeeks({ absolute }?: DiffOptions): number;
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
  inMonths({ absolute }?: DiffOptions): number;
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
  inYears({ absolute }?: DiffOptions): number;
}
export = Diff;
