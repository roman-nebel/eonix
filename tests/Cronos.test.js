import Chronos from "../index.js";

describe("Chronos", () => {
  describe(".clone", () => {
    test("creates a new object without modifying the original", () => {
      const date = new Chronos("2025-03-21T12:00:00Z");
      const cloned = date.clone();
      expect(cloned).not.toBe(date);
      expect(cloned.getTime()).toBe(date.getTime());
    });

    test("clones the object with a new time zone offset", () => {
      const date = new Chronos("2025-03-21T12:00:00Z");
      const cloned = date.clone({ offset: 4 }); // Clone with UTC+4
      expect(cloned.getUTCHours()).toBe(8); // Was 12:00 UTC, now 12:00 UTC+4
    });

    test("does not modify the original object when cloning with a new offset", () => {
      const date = new Chronos("2025-03-21T12:00:00Z");
      const cloned = date.clone({ offset: -2 });
      expect(date.getUTCHours()).toBe(12); // Original object remains unchanged
      expect(cloned.getUTCHours()).toBe(14); // New object UTC-2
    });
  });

  describe(".sort", () => {
    test("should throw an error when no arguments are provided", () => {
      expect(() => Chronos.sort()).toThrow();
    });

    test("should return the same date when one argument is provided", () => {
      const date = new Date();
      expect(Chronos.sort(date)).toEqual([date]);
    });

    test("should return sorted dates when multiple arguments are provided", () => {
      const dates = Array(12)
        .fill()
        .map(() => new Date());
      const [first, ...sortedDates] = Chronos.sort(...dates);
      expect(first.getTime()).toBeLessThanOrEqual(
        ...sortedDates.map((date) => date.getTime())
      );
    });

    test("should return same date when all arguments are the same", () => {
      const date = new Date();
      expect(Chronos.sort(date, date)).toEqual([date, date]);
    });

    test("should sort dates when provided as string", () => {
      const [earlier, later] = Chronos.sort("2023-06-30", "2023-01-01");
      expect(earlier.getTime()).toBeLessThanOrEqual(later.getTime());
    });

    test("should sort dates when provided as number (UNIX timestamp)", () => {
      const [earlier, later] = Chronos.sort(
        new Date("2023-06-30").valueOf(),
        new Date("2023-01-01").valueOf()
      );
      expect(earlier.getTime()).toBeLessThanOrEqual(later.getTime());
    });

    test("should sort dates when provided as instance of Date", () => {
      const [earlier, later] = Chronos.sort(
        new Date("2023-06-30"),
        new Date("2023-01-01")
      );
      expect(earlier.getTime()).toBeLessThanOrEqual(later.getTime());
    });
  });

  describe(".add", () => {
    test("should add years", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      date.add({ years: 2 });
      expect(date.toISOString()).toBe("2022-01-01T00:00:00.000Z");
    });

    test("should add months", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      date.add({ months: 3 });
      expect(date.toISOString()).toBe("2020-04-01T00:00:00.000Z");
    });

    test("should add weeks", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      date.add({ weeks: 2 });
      expect(date.toISOString()).toBe("2020-01-15T00:00:00.000Z");
    });

    test("should add days", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      date.add({ days: 10 });
      expect(date.toISOString()).toBe("2020-01-11T00:00:00.000Z");
    });

    test("should add hours", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      date.add({ hours: 5 });
      expect(date.toISOString()).toBe("2020-01-01T05:00:00.000Z");
    });

    test("should add minutes", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      date.add({ minutes: 30 });
      expect(date.toISOString()).toBe("2020-01-01T00:30:00.000Z");
    });

    test("should add seconds", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      date.add({ seconds: 45 });
      expect(date.toISOString()).toBe("2020-01-01T00:00:45.000Z");
    });

    test("should add milliseconds", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      date.add({ milliseconds: 500 });
      expect(date.toISOString()).toBe("2020-01-01T00:00:00.500Z");
    });

    test("should handle leap years (adding one year to Feb 29)", () => {
      const date = new Chronos("2020-02-29T00:00:00Z");
      date.add({ years: 1 });
      expect(date.toISOString()).toBe("2021-03-01T00:00:00.000Z");
    });

    test("should handle negative values (subtracting)", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      date.add({ years: -1, months: -1, days: -10 });
      expect(date.toISOString()).toBe("2018-11-21T00:00:00.000Z");
    });

    test("should handle daylight saving time changes", () => {
      const date = new Chronos("2023-03-12T01:00:00-08:00");
      date.add({ hours: 2 });
      expect(date.toISOString()).toBe("2023-03-12T11:00:00.000Z");
    });

    test("should handle large values correctly", () => {
      const date = new Chronos("2000-01-01T00:00:00Z");
      date.add({ years: 1000, months: 500, days: 10000, hours: 1000 });
      expect(date.toISOString()).toMatch("3069-02-27T16:00:00.000Z");
    });

    test("should handle fractional values (rounding)", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      date.add({ days: 1.5 });
      expect(date.toISOString()).toBe("2020-01-02T00:00:00.000Z");
    });

    test("should throw error if argument is missing", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      expect(() => date.add()).toThrow(
        "The argument must be a non-empty object"
      );
    });

    test("should throw error if argument is not an object", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      expect(() => date.add(123)).toThrow(
        "The argument must be a non-empty object"
      );
    });

    test("should throw error if argument is an empty object", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      expect(() => date.add({})).toThrow(
        "The argument must be a non-empty object"
      );
    });

    test("should throw error if parameter value is not a number", () => {
      const date = new Chronos("2020-01-01T00:00:00Z");
      expect(() => date.add({ years: "two" })).toThrow(
        "All parameters must be numbers"
      );
    });
  });

  describe(".convertToTimeZone", () => {
    test("keeps the same local time while shifting UTC time", () => {
      const date = new Chronos("2025-03-21T12:00:00Z");
      date.convertToTimeZone(6);
      expect(date.getUTCHours()).toBe(6);
    });

    test("handles negative offsets correctly", () => {
      const date = new Chronos("2025-03-21T12:00:00Z");
      date.convertToTimeZone(-3);
      expect(date.getUTCHours()).toBe(15);
    });

    test("does not change UTC time when offset remains the same", () => {
      const date = new Chronos("2025-03-21T12:00:00Z");
      date.convertToTimeZone(0);
      expect(date.getUTCHours()).toBe(12);
    });

    test("correctly shifts time when crossing UTC 0", () => {
      const date = new Chronos("2025-03-21T01:00:00Z");
      date.convertToTimeZone(-2);
      expect(date.getUTCHours()).toBe(3);
    });

    test("correctly shifts time when crossing the international date line", () => {
      const date = new Chronos("2025-03-21T23:00:00Z");
      date.convertToTimeZone(12);
      expect(date.getUTCHours()).toBe(11);
    });
  });

  describe(".getWeekday", () => {
    test("returns Monday (1) for a Monday date", () => {
      const date = new Chronos("2025-03-24"); // Monday
      expect(date.getWeekday()).toBe(1);
    });

    test("returns Tuesday (2) for a Tuesday date", () => {
      const date = new Chronos("2025-03-25"); // Tuesday
      expect(date.getWeekday()).toBe(2);
    });

    test("returns Wednesday (3) for a Wednesday date", () => {
      const date = new Chronos("2025-03-26"); // Wednesday
      expect(date.getWeekday()).toBe(3);
    });

    test("returns Thursday (4) for a Thursday date", () => {
      const date = new Chronos("2025-03-27"); // Thursday
      expect(date.getWeekday()).toBe(4);
    });

    test("returns Friday (5) for a Friday date", () => {
      const date = new Chronos("2025-03-28"); // Friday
      expect(date.getWeekday()).toBe(5);
    });

    test("returns Saturday (6) for a Saturday date", () => {
      const date = new Chronos("2025-03-29"); // Saturday
      expect(date.getWeekday()).toBe(6);
    });

    test("returns Sunday (7) for a Sunday date", () => {
      const date = new Chronos("2025-03-30"); // Sunday
      expect(date.getWeekday()).toBe(7);
    });

    test("handles leap year correctly (Feb 29, 2024 is Thursday)", () => {
      const date = new Chronos("2024-02-29");
      expect(date.getWeekday()).toBe(4); // Thursday
    });

    test("handles January 1st of a non-leap year (2025-01-01 is Wednesday)", () => {
      const date = new Chronos("2025-01-01");
      expect(date.getWeekday()).toBe(3); // Wednesday
    });

    test("handles January 1st of a leap year (2024-01-01 is Monday)", () => {
      const date = new Chronos("2024-01-01");
      expect(date.getWeekday()).toBe(1); // Monday
    });
  });

  describe(".getDayOfYear", () => {
    test("returns 1 for January 1st", () => {
      const date = new Chronos("2025-01-01");
      expect(date.getDayOfYear()).toBe(1);
    });

    test("returns 32 for February 1st (non-leap year)", () => {
      const date = new Chronos("2025-02-01");
      expect(date.getDayOfYear()).toBe(32);
    });

    test("returns 60 for February 29th (leap year)", () => {
      const date = new Chronos("2024-02-29"); // Leap year
      expect(date.getDayOfYear()).toBe(60);
    });

    test("returns 59 for February 28th (non-leap year)", () => {
      const date = new Chronos("2025-02-28"); // Non-leap year
      expect(date.getDayOfYear()).toBe(59);
    });

    test("returns 365 for December 31st (non-leap year)", () => {
      const date = new Chronos("2025-12-31");
      expect(date.getDayOfYear()).toBe(365);
    });

    test("returns 366 for December 31st (leap year)", () => {
      const date = new Chronos("2024-12-31"); // Leap year
      expect(date.getDayOfYear()).toBe(366);
    });

    test("correctly handles March 1st after leap year February", () => {
      const date = new Chronos("2024-03-01");
      expect(date.getDayOfYear()).toBe(61);
    });

    test("correctly handles March 1st in a non-leap year", () => {
      const date = new Chronos("2025-03-01");
      expect(date.getDayOfYear()).toBe(60);
    });

    test("handles mid-year date correctly (July 1st)", () => {
      const date = new Chronos("2025-07-01");
      expect(date.getDayOfYear()).toBe(182);
    });

    test("handles a date in the second half of the year (October 15th)", () => {
      const date = new Chronos("2025-10-15");
      expect(date.getDayOfYear()).toBe(288);
    });
  });

  describe(".getWeekNumber", () => {
    test("returns 1 for January 1st, 2025 (first week of the year)", () => {
      const date = new Chronos("2025-01-01T00:00:00Z");
      expect(date.getWeekNumber()).toBe(1);
    });

    test("returns 2 for January 8th, 2025", () => {
      const date = new Chronos("2025-01-08T00:00:00Z");
      expect(date.getWeekNumber()).toBe(2);
    });

    test("returns 52 for December 31st, 2023", () => {
      const date = new Chronos("2023-12-31T00:00:00Z");
      expect(date.getWeekNumber()).toBe(52);
    });

    test("returns 1 for January 4th, 2024 (first week of 2024)", () => {
      const date = new Chronos("2024-01-04T00:00:00Z");
      expect(date.getWeekNumber()).toBe(1);
    });

    test("returns 53 for December 31st, 2024 (leap year with 53 weeks)", () => {
      const date = new Chronos("2024-12-31T00:00:00Z");
      expect(date.getWeekNumber()).toBe(53);
    });

    test("returns 10 for March 5th, 2025", () => {
      const date = new Chronos("2025-03-05T00:00:00Z");
      expect(date.getWeekNumber()).toBe(10);
    });

    test("returns correct week number for a mid-year date (July 1st)", () => {
      const date = new Chronos("2025-07-01T00:00:00Z");
      expect(date.getWeekNumber()).toBe(27);
    });

    test("returns correct week number for a date late in the year (October 15th)", () => {
      const date = new Chronos("2025-10-15T00:00:00Z");
      expect(date.getWeekNumber()).toBe(42);
    });
  });

  describe(".isLeapYear", () => {
    test("returns true for a typical leap year (2024)", () => {
      const date = new Chronos("2024-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(true);
    });

    test("returns false for a typical non-leap year (2023)", () => {
      const date = new Chronos("2023-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(false);
    });

    test("returns false for a century year that is not divisible by 400 (1900)", () => {
      const date = new Chronos("1900-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(false);
    });

    test("returns true for a century year that is divisible by 400 (2000)", () => {
      const date = new Chronos("2000-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(true);
    });

    test("returns true for a recent leap year (2016)", () => {
      const date = new Chronos("2016-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(true);
    });

    test("returns false for a recent non-leap year (2017)", () => {
      const date = new Chronos("2017-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(false);
    });

    test("returns true for a future leap year (2080)", () => {
      const date = new Chronos("2080-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(true);
    });

    test("returns false for a far future non-leap year (2100)", () => {
      const date = new Chronos("2100-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(false);
    });
  });

  describe(".diff", () => {
    test("should calculate the difference correctly with default options", () => {
      const diff = Chronos.diff("2023-01-01", "2023-06-30").inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 5,
        days: 29,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle leap year difference correctly", () => {
      const diff = Chronos.diff("2020-02-29", "2021-02-28").inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 11,
        days: 30,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle leap year transition", () => {
      const diff = Chronos.diff("2023-02-28", "2024-02-29").inUnits();
      expect(diff).toEqual({
        years: 1,
        months: 0,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should calculate difference correctly for over 100 years", () => {
      const diff = Chronos.diff("1920-01-01", "2023-01-01").inUnits();
      expect(diff).toEqual({
        years: 103,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle reversed order of arguments", () => {
      const diff = Chronos.diff("2023-06-30", "2023-01-01").inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 5,
        days: 29,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle same date input", () => {
      const diff = Chronos.diff("2023-01-01", "2023-01-01").inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle exact year difference", () => {
      const diff = Chronos.diff("2020-01-01", "2023-01-01").inUnits();
      expect(diff).toEqual({
        years: 3,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle difference that includes a daylight saving transition", () => {
      const diff = Chronos.diff(
        "2023-03-25T23:00:00Z",
        "2023-03-26T02:00:00Z"
      ).inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 0,
        days: 0,
        hours: 3,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle difference across centuries", () => {
      const diff = Chronos.diff("1899-12-31", "2000-01-01").inUnits();
      expect(diff).toEqual({
        years: 100,
        months: 0,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle leap year single-day difference", () => {
      const diff = Chronos.diff("2024-02-28", "2024-02-29").inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 0,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle leap year to leap year difference", () => {
      const diff = Chronos.diff("2020-02-29", "2024-02-29").inUnits();
      expect(diff).toEqual({
        years: 4,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle 400-year difference", () => {
      const diff = Chronos.diff("1624-03-01", "2024-03-01").inUnits();
      expect(diff).toEqual({
        years: 400,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle daylight saving time transition in the same month", () => {
      const diff = Chronos.diff(
        "2023-03-25T22:00:00Z",
        "2023-03-26T02:00:00Z"
      ).inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 0,
        days: 0,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle partial year difference", () => {
      const diff = Chronos.diff("2023-01-15", "2023-06-20").inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 5,
        days: 5,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle month-end to month-start transition", () => {
      const diff = Chronos.diff("2023-01-31", "2023-02-01").inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 0,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle year transition without months", () => {
      const diff = Chronos.diff("2022-12-15", "2023-01-15").inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 1,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle millennia difference", () => {
      const diff = Chronos.diff("1024-05-20", "2024-05-20").inUnits();
      expect(diff).toEqual({
        years: 1000,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should calculate weeks and days together correctly", () => {
      const diff = Chronos.diff("2023-06-01", "2023-08-15").inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 2,
        days: 14,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle single-week difference", () => {
      const diff = Chronos.diff("2023-09-01", "2023-09-08").inUnits();
      expect(diff).toEqual({
        years: 0,
        months: 0,
        days: 7,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });
  });
});
