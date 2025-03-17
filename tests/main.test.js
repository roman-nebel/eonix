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

  /*
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
  */

  describe("getDiffInYears", () => {
    test("should return 0 when dates are in the same year", () => {
      expect(
        Chronos.getDiffInYears(new Date("2023-01-01"), new Date("2023-12-31"))
      ).toBe(0);
    });

    test("should return 1 for an exact one-year difference", () => {
      expect(
        Chronos.getDiffInYears(new Date("2023-01-01"), new Date("2024-01-01"))
      ).toBe(1);
    });

    test("should return 2 for two full years", () => {
      expect(
        Chronos.getDiffInYears(new Date("2020-05-15"), new Date("2022-05-15"))
      ).toBe(2);
    });

    test("should return negative value if the end date is before the start date", () => {
      expect(
        Chronos.getDiffInYears(new Date("2025-01-01"), new Date("2023-01-01"))
      ).toBe(-2);
    });

    test("should handle leap years correctly (Feb 29 -> Feb 28)", () => {
      expect(
        Chronos.getDiffInYears(new Date("2020-02-29"), new Date("2021-02-28"))
      ).toBe(0);
    });

    test("should handle leap years correctly (Feb 29 -> Mar 01)", () => {
      expect(
        Chronos.getDiffInYears(new Date("2020-02-29"), new Date("2021-03-01"))
      ).toBe(1);
    });

    test("should return 10 for a decade difference", () => {
      expect(
        Chronos.getDiffInYears(new Date("2010-06-30"), new Date("2020-06-30"))
      ).toBe(10);
    });

    test("should return 50 for half a century", () => {
      expect(
        Chronos.getDiffInYears(new Date("1973-07-15"), new Date("2023-07-15"))
      ).toBe(50);
    });

    test("should return 100 for a century difference", () => {
      expect(
        Chronos.getDiffInYears(new Date("1923-08-10"), new Date("2023-08-10"))
      ).toBe(100);
    });

    test("should correctly handle large differences with leap years", () => {
      expect(
        Chronos.getDiffInYears(new Date("1900-01-01"), new Date("2000-01-01"))
      ).toBe(100);
    });
  });

  describe("getDiffInMonths", () => {
    describe("Chronos.getDiffInMonths", () => {
      test("should return 0 when the dates are in the same month", () => {
        expect(Chronos.getDiffInMonths("2023-06-15", "2023-06-30")).toBe(0);
      });

      test("should count months correctly in the same year", () => {
        expect(Chronos.getDiffInMonths("2023-01-15", "2023-06-15")).toBe(5);
      });

      test("should count full months even with date shifts", () => {
        expect(Chronos.getDiffInMonths("2023-01-31", "2023-03-01")).toBe(1);
      });

      test("should count month difference across years", () => {
        expect(Chronos.getDiffInMonths("2022-11-15", "2023-02-15")).toBe(3);
      });

      test("should handle leap year transition correctly", () => {
        expect(Chronos.getDiffInMonths("2020-02-29", "2021-02-28")).toBe(11);
      });

      test("should count full years as 12 months", () => {
        expect(Chronos.getDiffInMonths("2020-05-15", "2023-05-15")).toBe(36);
      });

      test("should handle different days in month transition", () => {
        expect(Chronos.getDiffInMonths("2023-01-30", "2023-02-28")).toBe(0);
      });

      test("should handle large year gaps correctly", () => {
        expect(Chronos.getDiffInMonths("1900-01-01", "2000-01-01")).toBe(1200);
      });

      test("should return 0 when start date is after end date", () => {
        expect(Chronos.getDiffInMonths("2023-06-01", "2023-05-01")).toBe(-1);
      });

      test("should handle century transitions correctly", () => {
        expect(Chronos.getDiffInMonths("1899-12-31", "2000-01-01")).toBe(1200);
      });
    });
  });

  describe("getDiffInWeeks", () => {
    test("should return 0 for the same date", () => {
      expect(Chronos.getDiffInWeeks("2024-03-14", "2024-03-14")).toBe(0);
    });

    test("should count full weeks correctly", () => {
      expect(Chronos.getDiffInWeeks("2024-03-01", "2024-03-15")).toBe(2);
    });

    test("should ignore extra days if not a full week", () => {
      expect(Chronos.getDiffInWeeks("2024-03-01", "2024-03-16")).toBe(2);
    });

    test("should handle weeks across months", () => {
      expect(Chronos.getDiffInWeeks("2024-02-28", "2024-03-28")).toBe(4);
    });

    test("should handle weeks across years", () => {
      expect(Chronos.getDiffInWeeks("2023-12-01", "2024-01-15")).toBe(6);
    });

    test("should handle weeks across leap years", () => {
      expect(Chronos.getDiffInWeeks("2019-12-31", "2020-03-01")).toBe(8);
    });

    test("should handle full year difference", () => {
      expect(Chronos.getDiffInWeeks("2023-03-14", "2024-03-14")).toBe(52);
    });

    test("should return 0 if end date is before start date", () => {
      expect(Chronos.getDiffInWeeks("2024-03-15", "2024-03-01")).toBe(-2);
    });

    test("should handle very large differences correctly", () => {
      expect(Chronos.getDiffInWeeks("1900-01-01", "2000-01-01")).toBe(5217);
    });

    test("should handle DST changes correctly", () => {
      expect(Chronos.getDiffInWeeks("2024-03-24", "2024-04-07")).toBe(2);
    });
  });

  describe("getDiffInDays", () => {
    test("should return 0 for the same date", () => {
      expect(Chronos.getDiffInDays("2024-03-14", "2024-03-14")).toBe(0);
    });

    test("should count full days correctly", () => {
      expect(Chronos.getDiffInDays("2024-03-01", "2024-03-05")).toBe(4);
    });

    test("should handle leap years", () => {
      expect(Chronos.getDiffInDays("2020-02-28", "2020-03-01")).toBe(2);
    });

    test("should handle non-leap years", () => {
      expect(Chronos.getDiffInDays("2021-02-28", "2021-03-01")).toBe(1);
    });

    test("should handle differences across months", () => {
      expect(Chronos.getDiffInDays("2024-01-31", "2024-02-29")).toBe(29);
    });

    test("should handle differences across years", () => {
      expect(Chronos.getDiffInDays("2023-12-31", "2024-01-01")).toBe(1);
    });

    test("should handle century transitions", () => {
      expect(Chronos.getDiffInDays("1899-12-31", "2000-01-01")).toBe(36525);
    });

    test("should return 0 if end date is before start date", () => {
      expect(Chronos.getDiffInDays("2024-03-15", "2024-03-01")).toBe(-14);
    });

    test("should handle very large differences", () => {
      expect(Chronos.getDiffInDays("1900-01-01", "2000-01-01")).toBe(36524);
    });

    test("should handle DST changes", () => {
      expect(Chronos.getDiffInDays("2024-03-24", "2024-03-25")).toBe(1);
    });
  });

  describe("getDiffInHours", () => {
    test("should return 0 for the same time", () => {
      expect(
        Chronos.getDiffInHours("2024-03-14T12:00:00", "2024-03-14T12:00:00")
      ).toBe(0);
    });

    test("should count full hours correctly", () => {
      expect(
        Chronos.getDiffInHours("2024-03-14T00:00:00", "2024-03-14T10:00:00")
      ).toBe(10);
    });

    test("should handle hour differences across days", () => {
      expect(
        Chronos.getDiffInHours("2024-03-14T23:00:00", "2024-03-15T01:00:00")
      ).toBe(2);
    });

    test("should handle leap years", () => {
      expect(
        Chronos.getDiffInHours("2020-02-28T23:00:00", "2020-02-29T01:00:00")
      ).toBe(2);
    });

    test("should handle non-leap years", () => {
      expect(
        Chronos.getDiffInHours("2021-02-28T23:00:00", "2021-03-01T01:00:00")
      ).toBe(2);
    });

    test("should handle DST changes", () => {
      expect(
        Chronos.getDiffInHours("2024-03-24T01:00:00", "2024-03-24T03:00:00")
      ).toBe(2);
    });

    test("should handle large differences", () => {
      expect(
        Chronos.getDiffInHours("2000-01-01T00:00:00", "2000-01-02T00:00:00")
      ).toBe(24);
    });

    test("should return 0 if end time is before start time", () => {
      expect(
        Chronos.getDiffInHours("2024-03-14T15:00:00", "2024-03-14T10:00:00")
      ).toBe(-5);
    });

    test("should handle century transitions", () => {
      expect(
        Chronos.getDiffInHours("1899-12-31T23:00:00", "2000-01-01T01:00:00")
      ).toBe(876578);
    });

    test("should handle minutes and seconds correctly", () => {
      expect(
        Chronos.getDiffInHours("2024-03-14T12:00:59", "2024-03-14T13:00:00")
      ).toBe(0);
    });
  });

  describe("getDiffInMinutes", () => {
    test("should return 0 for the same minute", () => {
      expect(
        Chronos.getDiffInMinutes("2024-03-14T12:30:00", "2024-03-14T12:30:00")
      ).toBe(0);
    });

    test("should count full minutes correctly", () => {
      expect(
        Chronos.getDiffInMinutes("2024-03-14T12:00:00", "2024-03-14T12:10:00")
      ).toBe(10);
    });

    test("should handle hour transitions", () => {
      expect(
        Chronos.getDiffInMinutes("2024-03-14T12:59:00", "2024-03-14T13:01:00")
      ).toBe(2);
    });

    test("should handle day transitions", () => {
      expect(
        Chronos.getDiffInMinutes("2024-03-14T23:59:00", "2024-03-15T00:01:00")
      ).toBe(2);
    });

    test("should handle DST changes", () => {
      expect(
        Chronos.getDiffInMinutes("2024-03-24T01:59:00", "2024-03-24T03:01:00")
      ).toBe(62);
    });
  });

  describe("getDiffInSeconds", () => {
    test("should return 0 for the same second", () => {
      expect(
        Chronos.getDiffInSeconds("2024-03-14T12:30:30", "2024-03-14T12:30:30")
      ).toBe(0);
    });

    test("should count full seconds correctly", () => {
      expect(
        Chronos.getDiffInSeconds("2024-03-14T12:00:00", "2024-03-14T12:00:10")
      ).toBe(10);
    });

    test("should handle minute transitions", () => {
      expect(
        Chronos.getDiffInSeconds("2024-03-14T12:59:59", "2024-03-14T13:00:01")
      ).toBe(2);
    });

    test("should handle hour transitions", () => {
      expect(
        Chronos.getDiffInSeconds("2024-03-14T23:59:59", "2024-03-15T00:00:01")
      ).toBe(2);
    });
  });

  describe("getDiffInMilliseconds", () => {
    test("should return 0 for the same timestamp", () => {
      expect(
        Chronos.getDiffInMilliseconds(
          "2024-03-14T12:30:30.500",
          "2024-03-14T12:30:30.500"
        )
      ).toBe(0);
    });

    test("should count full milliseconds correctly", () => {
      expect(
        Chronos.getDiffInMilliseconds(
          "2024-03-14T12:00:00.000",
          "2024-03-14T12:00:00.100"
        )
      ).toBe(100);
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
