const Chronos = require("../index.js");

describe("Chronos", () => {
  describe(".setTimeZoneOffset", () => {
    test("modifies the current instance instead of creating a new one", () => {
      const date = new Chronos("2025-03-21T12:00:00Z");
      date.setTimeZoneOffset(5); // Set offset to UTC+5
      expect(date.timeZoneOffset).toBe(-300); // -300 minutes = UTC+5
    });

    test("correctly adjusts time when changing the time zone", () => {
      const date = new Chronos("2025-03-21T12:00:00Z");
      date.setTimeZoneOffset(3); // Set offset to UTC+3
      expect(date.getUTCHours()).toBe(15); // Was 12:00 UTC, now 15:00 UTC+3
    });

    test("handles negative offsets correctly", () => {
      const date = new Chronos("2025-03-21T12:00:00Z");
      date.setTimeZoneOffset(-7); // Set offset to UTC-7
      expect(date.getUTCHours()).toBe(5); // Was 12:00 UTC, now 5:00 UTC-7
    });

    test("works when crossing UTC 0", () => {
      const date = new Chronos("2025-03-21T00:00:00Z");
      date.setTimeZoneOffset(-1); // Set offset to UTC-1
      expect(date.getUTCHours()).toBe(23); // Was 00:00 UTC, now 23:00 UTC-1 (previous day)
    });
  });

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
      expect(cloned.getUTCHours()).toBe(16); // Was 12:00 UTC, now 16:00 UTC+4
    });

    test("does not modify the original object when cloning with a new offset", () => {
      const date = new Chronos("2025-03-21T12:00:00Z");
      const cloned = date.clone({ offset: -2 });
      expect(date.getUTCHours()).toBe(12); // Original object remains unchanged
      expect(cloned.getUTCHours()).toBe(10); // New object UTC-2
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
});
