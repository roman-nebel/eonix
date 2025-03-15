const Chronos = require("../index.js");

describe("Chronos", () => {
  describe("createSortedDates", () => {
    test("should return dates in sorted order", () => {
      const [earlier, later] = Chronos.createSortedDates(
        "2023-06-30",
        "2023-01-01"
      );
      expect(earlier.getTime()).toBeLessThan(later.getTime());
    });
  });

  describe("getDiff", () => {
    test("should calculate the difference correctly with default options", () => {
      const diff = Chronos.getDiff("2023-01-01", "2023-06-30");
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

    test("should calculate the difference including weeks", () => {
      const diff = Chronos.getDiff("2023-01-01", "2023-06-30", {
        withWeeks: true,
      });
      expect(diff).toEqual({
        years: 0,
        months: 5,
        weeks: 4,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should calculate the difference without months", () => {
      const diff = Chronos.getDiff("2023-01-01", "2023-06-30", {
        withMonths: false,
      });
      expect(diff).toEqual({
        years: 0,
        months: undefined,
        weeks: undefined,
        days: 180,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle leap year difference correctly", () => {
      const diff = Chronos.getDiff("2020-02-29", "2021-02-28");
      expect(diff).toEqual({
        years: 0,
        months: 11,
        weeks: undefined,
        days: 28,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle leap year transition", () => {
      const diff = Chronos.getDiff("2023-02-28", "2024-02-29");
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
      const diff = Chronos.getDiff("1920-01-01", "2023-01-01");
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
      const diff = Chronos.getDiff("2023-06-30", "2023-01-01");
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

    test("should calculate difference correctly without months", () => {
      const diff = Chronos.getDiff("2023-01-01", "2023-06-30", {
        withMonths: false,
      });
      expect(diff).toEqual({
        years: 0,
        months: undefined,
        weeks: undefined,
        days: 180,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should calculate difference correctly without weeks", () => {
      const diff = Chronos.getDiff("2023-01-01", "2023-06-30", {
        withWeeks: false,
      });
      expect(diff).toEqual({
        years: 0,
        months: 5,
        weeks: undefined,
        days: 29,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle same date input", () => {
      const diff = Chronos.getDiff("2023-01-01", "2023-01-01");
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
      const diff = Chronos.getDiff("2020-01-01", "2023-01-01");
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
      const diff = Chronos.getDiff(
        "2023-03-25T23:00:00Z",
        "2023-03-26T02:00:00Z"
      );
      expect(diff).toEqual({
        years: 0,
        months: 0,
        weeks: undefined,
        days: 0,
        hours: 3,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle difference across centuries", () => {
      const diff = Chronos.getDiff("1899-12-31", "2000-01-01");
      expect(diff).toEqual({
        years: 100,
        months: 0,
        weeks: undefined,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle leap year single-day difference", () => {
      const diff = Chronos.getDiff("2024-02-28", "2024-02-29");
      expect(diff).toEqual({
        years: 0,
        months: 0,
        weeks: undefined,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle leap year to leap year difference", () => {
      const diff = Chronos.getDiff("2020-02-29", "2024-02-29");
      expect(diff).toEqual({
        years: 4,
        months: 0,
        weeks: undefined,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle 400-year difference", () => {
      const diff = Chronos.getDiff("1624-03-01", "2024-03-01");
      expect(diff).toEqual({
        years: 400,
        months: 0,
        weeks: undefined,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle daylight saving time transition in the same month", () => {
      const diff = Chronos.getDiff(
        "2023-03-25T22:00:00Z",
        "2023-03-26T02:00:00Z"
      );
      expect(diff).toEqual({
        years: 0,
        months: 0,
        weeks: undefined,
        days: 0,
        hours: 4,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle partial year difference", () => {
      const diff = Chronos.getDiff("2023-01-15", "2023-06-20");
      expect(diff).toEqual({
        years: 0,
        months: 5,
        weeks: undefined,
        days: 5,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle month-end to month-start transition", () => {
      const diff = Chronos.getDiff("2023-01-31", "2023-02-01");
      expect(diff).toEqual({
        years: 0,
        months: 0,
        weeks: undefined,
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle year transition without months", () => {
      const diff = Chronos.getDiff("2022-12-15", "2023-01-15", {
        withMonths: false,
      });
      expect(diff).toEqual({
        years: 0,
        months: undefined,
        weeks: undefined,
        days: 31,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle millennia difference", () => {
      const diff = Chronos.getDiff("1024-05-20", "2024-05-20");
      expect(diff).toEqual({
        years: 1000,
        months: 0,
        weeks: undefined,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should calculate weeks and days together correctly", () => {
      const diff = Chronos.getDiff("2023-06-01", "2023-08-15", {
        withWeeks: true,
      });
      expect(diff).toEqual({
        years: 0,
        months: 2,
        weeks: 2,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    test("should handle single-week difference", () => {
      const diff = Chronos.getDiff("2023-09-01", "2023-09-08", {
        withWeeks: true,
      });
      expect(diff).toEqual({
        years: 0,
        months: 0,
        weeks: 1,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });
  });

  describe("getDiffInUnits", () => {
    test("should calculate difference in days", () => {
      expect(Chronos.getDiffInUnits("2023-01-01", "2023-06-30", "days")).toBe(
        180
      );
    });

    test("should calculate difference in weeks", () => {
      expect(Chronos.getDiffInUnits("2023-01-01", "2023-06-30", "weeks")).toBe(
        25
      );
    });
  });

  describe("getDiffInMilliseconds", () => {
    test("should calculate the difference in milliseconds", () => {
      expect(Chronos.getDiffInMilliseconds("2023-01-01", "2023-01-02")).toBe(
        86400000
      );
    });
  });
});
