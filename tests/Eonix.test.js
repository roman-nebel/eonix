const Eonix = require("../lib/index.js");

describe("Eonix", () => {
  describe(".clone", () => {
    test("creates a deep copy of the Eonix instance without modifying the original", () => {
      const date = new Eonix("2025-03-21T12:00:00Z");
      const cloned = date.clone();
      expect(cloned).not.toBe(date);
      expect(cloned.getTime()).toBe(date.getTime());
    });

    test("creates a clone with a new timezone offset while preserving the original", () => {
      const date = new Eonix("2025-03-21T12:00:00Z");
      const cloned = date.clone({ offset: 4 }); // Clone with UTC+4
      expect(cloned.getUTCHours()).toBe(8); // Was 12:00 UTC, now 12:00 UTC+4
    });

    test("maintains original object's timezone when cloning with a new offset", () => {
      const date = new Eonix("2025-03-21T12:00:00Z");
      const cloned = date.clone({ offset: -2 });
      expect(date.getUTCHours()).toBe(12); // Original object remains unchanged
      expect(cloned.getUTCHours()).toBe(14); // New object UTC-2
    });
  });

  describe(".sort", () => {
    test("throws an error when no arguments are provided", () => {
      expect(() => Eonix.sort()).toThrow();
    });

    test("returns a single-element array when one argument is provided", () => {
      const date = new Date();
      expect(Eonix.sort(date)).toEqual([date]);
    });

    test("sorts multiple dates in ascending order", () => {
      const dates = Array(12)
        .fill()
        .map(() => new Date());
      const [first, ...sortedDates] = Eonix.sort(...dates);
      expect(first.getTime()).toBeLessThanOrEqual(
        ...sortedDates.map((date) => date.getTime())
      );
    });

    test("preserves duplicate dates in the sorted array", () => {
      const date = new Date();
      expect(Eonix.sort(date, date)).toEqual([date, date]);
    });

    test("sorts dates provided as ISO string format", () => {
      const [earlier, later] = Eonix.sort("2023-06-30", "2023-01-01");
      expect(earlier.getTime()).toBeLessThanOrEqual(later.getTime());
    });

    test("sorts dates provided as UNIX timestamps", () => {
      const [earlier, later] = Eonix.sort(
        new Date("2023-06-30").valueOf(),
        new Date("2023-01-01").valueOf()
      );
      expect(earlier.getTime()).toBeLessThanOrEqual(later.getTime());
    });

    test("sorts dates provided as Date objects", () => {
      const [earlier, later] = Eonix.sort(
        new Date("2023-06-30"),
        new Date("2023-01-01")
      );
      expect(earlier.getTime()).toBeLessThanOrEqual(later.getTime());
    });
  });

  describe(".add", () => {
    test("adds years while preserving month and day", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      date.add({ years: 2 });
      expect(date.toISOString()).toBe("2022-01-01T00:00:00.000Z");
    });

    test("adds months while handling month-end transitions", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      date.add({ months: 3 });
      expect(date.toISOString()).toBe("2020-04-01T00:00:00.000Z");
    });

    test("adds weeks while preserving day of week", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      date.add({ weeks: 2 });
      expect(date.toISOString()).toBe("2020-01-15T00:00:00.000Z");
    });

    test("adds days while handling month transitions", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      date.add({ days: 10 });
      expect(date.toISOString()).toBe("2020-01-11T00:00:00.000Z");
    });

    test("adds hours while preserving minutes and seconds", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      date.add({ hours: 5 });
      expect(date.toISOString()).toBe("2020-01-01T05:00:00.000Z");
    });

    test("adds minutes while preserving seconds", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      date.add({ minutes: 30 });
      expect(date.toISOString()).toBe("2020-01-01T00:30:00.000Z");
    });

    test("adds seconds while preserving milliseconds", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      date.add({ seconds: 45 });
      expect(date.toISOString()).toBe("2020-01-01T00:00:45.000Z");
    });

    test("adds milliseconds with precision", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      date.add({ milliseconds: 500 });
      expect(date.toISOString()).toBe("2020-01-01T00:00:00.500Z");
    });

    test("handles leap year transition when adding years", () => {
      const date = new Eonix("2020-02-29T00:00:00Z");
      date.add({ years: 1 });
      expect(date.toISOString()).toBe("2021-03-01T00:00:00.000Z");
    });

    test("supports negative values for subtraction", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      date.add({ years: -1, months: -1, days: -10 });
      expect(date.toISOString()).toBe("2018-11-21T00:00:00.000Z");
    });

    test("handles daylight saving time transitions correctly", () => {
      const date = new Eonix("2023-03-12T01:00:00-08:00");
      date.add({ hours: 2 });
      expect(date.toISOString()).toBe("2023-03-12T11:00:00.000Z");
    });

    test("handles large values without overflow", () => {
      const date = new Eonix("2000-01-01T00:00:00Z");
      date.add({ years: 1000, months: 500, days: 10000, hours: 1000 });
      expect(date.toISOString()).toMatch("3069-02-27T16:00:00.000Z");
    });

    test("rounds fractional values to nearest integer", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      date.add({ days: 1.5 });
      expect(date.toISOString()).toBe("2020-01-02T00:00:00.000Z");
    });

    test("throws error when no argument is provided", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      expect(() => date.add()).toThrow(
        "The argument must be a non-empty object"
      );
    });

    test("throws error when argument is not an object", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      expect(() => date.add(123)).toThrow(
        "The argument must be a non-empty object"
      );
    });

    test("throws error when argument is an empty object", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      expect(() => date.add({})).toThrow(
        "The argument must be a non-empty object"
      );
    });

    test("throws error when parameter value is not a number", () => {
      const date = new Eonix("2020-01-01T00:00:00Z");
      expect(() => date.add({ years: "two" })).toThrow(
        "All parameters must be numbers"
      );
    });
  });

  describe(".convertToTimeZone", () => {
    test("adjusts UTC time while preserving local time", () => {
      const date = new Eonix("2025-03-21T12:00:00Z");
      date.convertToTimeZone(6);
      expect(date.getUTCHours()).toBe(6);
    });

    test("handles negative timezone offsets correctly", () => {
      const date = new Eonix("2025-03-21T12:00:00Z");
      date.convertToTimeZone(-3);
      expect(date.getUTCHours()).toBe(15);
    });

    test("preserves time when converting to same timezone", () => {
      const date = new Eonix("2025-03-21T12:00:00Z");
      date.convertToTimeZone(0);
      expect(date.getUTCHours()).toBe(12);
    });

    test("handles timezone conversion across UTC midnight", () => {
      const date = new Eonix("2025-03-21T01:00:00Z");
      date.convertToTimeZone(-2);
      expect(date.getUTCHours()).toBe(3);
    });

    test("handles timezone conversion across international date line", () => {
      const date = new Eonix("2025-03-21T23:00:00Z");
      date.convertToTimeZone(12);
      expect(date.getUTCHours()).toBe(11);
    });
  });

  describe(".getWeekday", () => {
    test("returns 1 for Monday", () => {
      const date = new Eonix("2025-03-24"); // Monday
      expect(date.getWeekday()).toBe(1);
    });

    test("returns 2 for Tuesday", () => {
      const date = new Eonix("2025-03-25"); // Tuesday
      expect(date.getWeekday()).toBe(2);
    });

    test("returns 3 for Wednesday", () => {
      const date = new Eonix("2025-03-26"); // Wednesday
      expect(date.getWeekday()).toBe(3);
    });

    test("returns 4 for Thursday", () => {
      const date = new Eonix("2025-03-27"); // Thursday
      expect(date.getWeekday()).toBe(4);
    });

    test("returns 5 for Friday", () => {
      const date = new Eonix("2025-03-28"); // Friday
      expect(date.getWeekday()).toBe(5);
    });

    test("returns 6 for Saturday", () => {
      const date = new Eonix("2025-03-29"); // Saturday
      expect(date.getWeekday()).toBe(6);
    });

    test("returns 7 for Sunday", () => {
      const date = new Eonix("2025-03-30"); // Sunday
      expect(date.getWeekday()).toBe(7);
    });

    test("handles leap year February 29th correctly", () => {
      const date = new Eonix("2024-02-29");
      expect(date.getWeekday()).toBe(4); // Thursday
    });

    test("handles New Year's Day in non-leap year", () => {
      const date = new Eonix("2025-01-01");
      expect(date.getWeekday()).toBe(3); // Wednesday
    });

    test("handles New Year's Day in leap year", () => {
      const date = new Eonix("2024-01-01");
      expect(date.getWeekday()).toBe(1); // Monday
    });
  });

  describe(".getDayOfYear", () => {
    test("returns 1 for January 1st", () => {
      const date = new Eonix("2025-01-01");
      expect(date.getDayOfYear()).toBe(1);
    });

    test("returns correct day for February 1st in non-leap year", () => {
      const date = new Eonix("2025-02-01");
      expect(date.getDayOfYear()).toBe(32);
    });

    test("returns correct day for February 29th in leap year", () => {
      const date = new Eonix("2024-02-29"); // Leap year
      expect(date.getDayOfYear()).toBe(60);
    });

    test("returns correct day for February 28th in non-leap year", () => {
      const date = new Eonix("2025-02-28"); // Non-leap year
      expect(date.getDayOfYear()).toBe(59);
    });

    test("returns 365 for December 31st in non-leap year", () => {
      const date = new Eonix("2025-12-31");
      expect(date.getDayOfYear()).toBe(365);
    });

    test("returns 366 for December 31st in leap year", () => {
      const date = new Eonix("2024-12-31"); // Leap year
      expect(date.getDayOfYear()).toBe(366);
    });

    test("handles March 1st after leap year February correctly", () => {
      const date = new Eonix("2024-03-01");
      expect(date.getDayOfYear()).toBe(61);
    });

    test("handles March 1st in non-leap year correctly", () => {
      const date = new Eonix("2025-03-01");
      expect(date.getDayOfYear()).toBe(60);
    });

    test("handles mid-year date correctly", () => {
      const date = new Eonix("2025-07-01");
      expect(date.getDayOfYear()).toBe(182);
    });

    test("handles late-year date correctly", () => {
      const date = new Eonix("2025-10-15");
      expect(date.getDayOfYear()).toBe(288);
    });
  });

  describe(".getWeekNumber", () => {
    test("returns 1 for first week of the year", () => {
      const date = new Eonix("2025-01-01T00:00:00Z");
      expect(date.getWeekNumber()).toBe(1);
    });

    test("returns correct week number for second week", () => {
      const date = new Eonix("2025-01-08T00:00:00Z");
      expect(date.getWeekNumber()).toBe(2);
    });

    test("returns correct week number for last week of previous year", () => {
      const date = new Eonix("2023-12-31T00:00:00Z");
      expect(date.getWeekNumber()).toBe(52);
    });

    test("returns 1 for first week of leap year", () => {
      const date = new Eonix("2024-01-04T00:00:00Z");
      expect(date.getWeekNumber()).toBe(1);
    });

    test("returns 53 for last week of leap year", () => {
      const date = new Eonix("2024-12-31T00:00:00Z");
      expect(date.getWeekNumber()).toBe(53);
    });

    test("returns correct week number for early spring", () => {
      const date = new Eonix("2025-03-05T00:00:00Z");
      expect(date.getWeekNumber()).toBe(10);
    });

    test("returns correct week number for mid-year", () => {
      const date = new Eonix("2025-07-01T00:00:00Z");
      expect(date.getWeekNumber()).toBe(27);
    });

    test("returns correct week number for late autumn", () => {
      const date = new Eonix("2025-10-15T00:00:00Z");
      expect(date.getWeekNumber()).toBe(42);
    });
  });

  describe(".isLeapYear", () => {
    test("returns true for typical leap year", () => {
      const date = new Eonix("2024-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(true);
    });

    test("returns false for typical non-leap year", () => {
      const date = new Eonix("2023-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(false);
    });

    test("returns false for century year not divisible by 400", () => {
      const date = new Eonix("1900-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(false);
    });

    test("returns true for century year divisible by 400", () => {
      const date = new Eonix("2000-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(true);
    });

    test("returns true for recent leap year", () => {
      const date = new Eonix("2016-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(true);
    });

    test("returns false for recent non-leap year", () => {
      const date = new Eonix("2017-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(false);
    });

    test("returns true for future leap year", () => {
      const date = new Eonix("2080-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(true);
    });

    test("returns false for future non-leap year", () => {
      const date = new Eonix("2100-01-01T00:00:00Z");
      expect(date.isLeapYear()).toBe(false);
    });
  });

  describe(".diff", () => {
    test("calculates difference with default units", () => {
      const diff = Eonix.diff("2023-01-01", "2023-06-30").inUnits();
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

    test("handles leap year difference correctly", () => {
      const diff = Eonix.diff("2020-02-29", "2021-02-28").inUnits();
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

    test("handles leap year transition correctly", () => {
      const diff = Eonix.diff("2023-02-28", "2024-02-29").inUnits();
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

    test("calculates difference for over 100 years", () => {
      const diff = Eonix.diff("1920-01-01", "2023-01-01").inUnits();
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

    test("handles reversed date order correctly", () => {
      const diff = Eonix.diff("2023-06-30", "2023-01-01").inUnits();
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

    test("returns zero difference for same date", () => {
      const diff = Eonix.diff("2023-01-01", "2023-01-01").inUnits();
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

    test("calculates exact year difference correctly", () => {
      const diff = Eonix.diff("2020-01-01", "2023-01-01").inUnits();
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

    test("handles daylight saving time transition correctly", () => {
      const diff = Eonix.diff(
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

    test("handles century transition correctly", () => {
      const diff = Eonix.diff("1899-12-31", "2000-01-01").inUnits();
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

    test("handles single-day difference in leap year", () => {
      const diff = Eonix.diff("2024-02-28", "2024-02-29").inUnits();
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

    test("handles leap year to leap year difference", () => {
      const diff = Eonix.diff("2020-02-29", "2024-02-29").inUnits();
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

    test("handles 400-year difference correctly", () => {
      const diff = Eonix.diff("1624-03-01", "2024-03-01").inUnits();
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

    test("handles DST transition within same month", () => {
      const diff = Eonix.diff(
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

    test("handles partial year difference correctly", () => {
      const diff = Eonix.diff("2023-01-15", "2023-06-20").inUnits();
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

    test("handles month-end to month-start transition", () => {
      const diff = Eonix.diff("2023-01-31", "2023-02-01").inUnits();
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

    test("handles year transition without month change", () => {
      const diff = Eonix.diff("2022-12-15", "2023-01-15").inUnits();
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

    test("handles millennia difference correctly", () => {
      const diff = Eonix.diff("1024-05-20", "2024-05-20").inUnits();
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

    test("calculates weeks and days together correctly", () => {
      const diff = Eonix.diff("2023-06-01", "2023-08-15").inUnits();
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

    test("handles single-week difference correctly", () => {
      const diff = Eonix.diff("2023-09-01", "2023-09-08").inUnits();
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

  describe('.inRange', () => {
    test('returns true for date within range', () => {
      const date = new Eonix('2023-06-15');
      const start = new Eonix('2023-06-01');
      const end = new Eonix('2023-06-30');
      expect(date.inRange(start, end)).toBe(true);
    });

    test('returns false for date before range', () => {
      const date = new Eonix('2023-05-31');
      const start = new Eonix('2023-06-01');
      const end = new Eonix('2023-06-30');
      expect(date.inRange(start, end)).toBe(false);
    });

    test('returns false for date after range', () => {
      const date = new Eonix('2023-07-01');
      const start = new Eonix('2023-06-01');
      const end = new Eonix('2023-06-30');
      expect(date.inRange(start, end)).toBe(false);
    });

    test('returns true for date equal to start of range', () => {
      const date = new Eonix('2023-06-01');
      const start = new Eonix('2023-06-01');
      const end = new Eonix('2023-06-30');
      expect(date.inRange(start, end)).toBe(true);
      expect(date.inRange(start, end, {includeStart: false})).toBe(false);
    });

    test('returns true for date equal to end of range', () => {
      const date = new Eonix('2023-06-30');
      const start = new Eonix('2023-06-01');
      const end = new Eonix('2023-06-30');
      expect(date.inRange(start, end)).toBe(true);
      expect(date.inRange(start, end, {includeEnd: false})).toBe(false);
    });

    test('handles empty range correctly', () => {
      const date = new Eonix('2023-06-15');
      const start = new Eonix('2023-06-15');
      const end = new Eonix('2023-06-15');
      expect(date.inRange(start, end)).toBe(true);
    });

    test('returns false for invalid range where start is after end', () => {
      const date = new Eonix('2023-06-15');
      const start = new Eonix('2023-06-30');
      const end = new Eonix('2023-06-01');
      expect(date.inRange(start, end)).toBe(false);
    });
  })
});
