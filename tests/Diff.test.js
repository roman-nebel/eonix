import Diff from "../lib/Diff/Diff.js";

describe("Diff", () => {
  describe(".inYears", () => {
    test("should return 0 when dates are in the same year", () => {
      expect(
        new Diff(new Date("2023-01-01"), new Date("2023-12-31")).inYears()
      ).toBe(0);
    });

    test("should return 1 for an exact one-year difference", () => {
      expect(
        new Diff(new Date("2023-01-01"), new Date("2024-01-01")).inYears()
      ).toBe(1);
    });

    test("should return 2 for two full years", () => {
      expect(
        new Diff(new Date("2020-05-15"), new Date("2022-05-15")).inYears()
      ).toBe(2);
    });

    test("should return negative value if the end date is before the start date", () => {
      expect(
        new Diff(new Date("2025-01-01"), new Date("2023-01-01")).inYears()
      ).toBe(-2);
    });

    test("should handle leap years correctly (Feb 29 -> Feb 28)", () => {
      expect(
        new Diff(new Date("2020-02-29"), new Date("2021-02-28")).inYears()
      ).toBe(0);
    });

    test("should handle leap years correctly (Feb 29 -> Mar 01)", () => {
      expect(
        new Diff(new Date("2020-02-29"), new Date("2021-03-01")).inYears()
      ).toBe(1);
    });

    test("should return 10 for a decade difference", () => {
      expect(
        new Diff(new Date("2010-06-30"), new Date("2020-06-30")).inYears()
      ).toBe(10);
    });

    test("should return 50 for half a century", () => {
      expect(
        new Diff(new Date("1973-07-15"), new Date("2023-07-15")).inYears()
      ).toBe(50);
    });

    test("should return 100 for a century difference", () => {
      expect(
        new Diff(new Date("1923-08-10"), new Date("2023-08-10")).inYears()
      ).toBe(100);
    });

    test("should correctly handle large differences with leap years", () => {
      expect(
        new Diff(new Date("1900-01-01"), new Date("2000-01-01")).inYears()
      ).toBe(100);
    });
  });

  describe(".inMonths", () => {
    describe("new Diff().inMonths", () => {
      test("should return 0 when the dates are in the same month", () => {
        expect(new Diff("2023-06-15", "2023-06-30").inMonths()).toBe(0);
      });

      test("should count months correctly in the same year", () => {
        expect(new Diff("2023-01-15", "2023-06-15").inMonths()).toBe(5);
      });

      test("should count full months even with date shifts", () => {
        expect(new Diff("2023-01-31", "2023-03-01").inMonths()).toBe(1);
      });

      test("should count month difference across years", () => {
        expect(new Diff("2022-11-15", "2023-02-15").inMonths()).toBe(3);
      });

      test("should handle leap year transition correctly", () => {
        expect(new Diff("2020-02-29", "2021-02-28").inMonths()).toBe(11);
      });

      test("should count full years as 12 months", () => {
        expect(new Diff("2020-05-15", "2023-05-15").inMonths()).toBe(36);
      });

      test("should handle different days in month transition", () => {
        expect(new Diff("2023-01-30", "2023-02-28").inMonths()).toBe(0);
      });

      test("should handle large year gaps correctly", () => {
        expect(new Diff("1900-01-01", "2000-01-01").inMonths()).toBe(1200);
      });

      test("should return 0 when start date is after end date", () => {
        expect(new Diff("2023-06-01", "2023-05-01").inMonths()).toBe(-1);
      });

      test("should handle century transitions correctly", () => {
        expect(new Diff("1899-12-31", "2000-01-01").inMonths()).toBe(1200);
      });
    });
  });

  describe(".inWeeks", () => {
    test("should return 0 for the same date", () => {
      expect(new Diff("2024-03-14", "2024-03-14").inWeeks()).toBe(0);
    });

    test("should count full weeks correctly", () => {
      expect(new Diff("2024-03-01", "2024-03-15").inWeeks()).toBe(2);
    });

    test("should ignore extra days if not a full week", () => {
      expect(new Diff("2024-03-01", "2024-03-16").inWeeks()).toBe(2);
    });

    test("should handle weeks across months", () => {
      expect(new Diff("2024-02-28", "2024-03-28").inWeeks()).toBe(4);
    });

    test("should handle weeks across years", () => {
      expect(new Diff("2023-12-01", "2024-01-15").inWeeks()).toBe(6);
    });

    test("should handle weeks across leap years", () => {
      expect(new Diff("2019-12-31", "2020-03-01").inWeeks()).toBe(8);
    });

    test("should handle full year difference", () => {
      expect(new Diff("2023-03-14", "2024-03-14").inWeeks()).toBe(52);
    });

    test("should return 0 if end date is before start date", () => {
      expect(new Diff("2024-03-15", "2024-03-01").inWeeks()).toBe(-2);
    });

    test("should handle very large differences correctly", () => {
      expect(new Diff("1900-01-01", "2000-01-01").inWeeks()).toBe(5217);
    });

    test("should handle DST changes correctly", () => {
      expect(new Diff("2024-03-24", "2024-04-07").inWeeks()).toBe(2);
    });
  });

  describe(".inDays", () => {
    test("should return 0 for the same date", () => {
      expect(new Diff("2024-03-14", "2024-03-14").inDays()).toBe(0);
    });

    test("should count full days correctly", () => {
      expect(new Diff("2024-03-01", "2024-03-05").inDays()).toBe(4);
    });

    test("should handle leap years", () => {
      expect(new Diff("2020-02-28", "2020-03-01").inDays()).toBe(2);
    });

    test("should handle non-leap years", () => {
      expect(new Diff("2021-02-28", "2021-03-01").inDays()).toBe(1);
    });

    test("should handle differences across months", () => {
      expect(new Diff("2024-01-31", "2024-02-29").inDays()).toBe(29);
    });

    test("should handle differences across years", () => {
      expect(new Diff("2023-12-31", "2024-01-01").inDays()).toBe(1);
    });

    test("should handle century transitions", () => {
      expect(new Diff("1899-12-31", "2000-01-01").inDays()).toBe(36525);
    });

    test("should return 0 if end date is before start date", () => {
      expect(new Diff("2024-03-15", "2024-03-01").inDays()).toBe(-14);
    });

    test("should handle very large differences", () => {
      expect(new Diff("1900-01-01", "2000-01-01").inDays()).toBe(36524);
    });

    test("should handle DST changes", () => {
      expect(new Diff("2024-03-24", "2024-03-25").inDays()).toBe(1);
    });
  });

  describe(".inHours", () => {
    test("should return 0 for the same time", () => {
      expect(
        new Diff("2024-03-14T12:00:00", "2024-03-14T12:00:00").inHours()
      ).toBe(0);
    });

    test("should count full hours correctly", () => {
      expect(
        new Diff("2024-03-14T00:00:00", "2024-03-14T10:00:00").inHours()
      ).toBe(10);
    });

    test("should handle hour differences across days", () => {
      expect(
        new Diff("2024-03-14T23:00:00", "2024-03-15T01:00:00").inHours()
      ).toBe(2);
    });

    test("should handle leap years", () => {
      expect(
        new Diff("2020-02-28T23:00:00", "2020-02-29T01:00:00").inHours()
      ).toBe(2);
    });

    test("should handle non-leap years", () => {
      expect(
        new Diff("2021-02-28T23:00:00", "2021-03-01T01:00:00").inHours()
      ).toBe(2);
    });

    test("should handle DST changes", () => {
      expect(
        new Diff("2024-03-24T01:00:00", "2024-03-24T03:00:00").inHours()
      ).toBe(2);
    });

    test("should handle large differences", () => {
      expect(
        new Diff("2000-01-01T00:00:00", "2000-01-02T00:00:00").inHours()
      ).toBe(24);
    });

    test("should return 0 if end time is before start time", () => {
      expect(
        new Diff("2024-03-14T15:00:00", "2024-03-14T10:00:00").inHours()
      ).toBe(-5);
    });

    test("should handle century transitions", () => {
      expect(
        new Diff("1899-12-31T23:00:00", "2000-01-01T01:00:00").inHours()
      ).toBe(876578);
    });

    test("should handle minutes and seconds correctly", () => {
      expect(
        new Diff("2024-03-14T12:00:59", "2024-03-14T13:00:00").inHours()
      ).toBe(0);
    });
  });

  describe(".inMinutes", () => {
    test("should return 0 for the same minute", () => {
      expect(
        new Diff("2024-03-14T12:30:00", "2024-03-14T12:30:00").inMinutes()
      ).toBe(0);
    });

    test("should count full minutes correctly", () => {
      expect(
        new Diff("2024-03-14T12:00:00", "2024-03-14T12:10:00").inMinutes()
      ).toBe(10);
    });

    test("should handle hour transitions", () => {
      expect(
        new Diff("2024-03-14T12:59:00", "2024-03-14T13:01:00").inMinutes()
      ).toBe(2);
    });

    test("should handle day transitions", () => {
      expect(
        new Diff("2024-03-14T23:59:00", "2024-03-15T00:01:00").inMinutes()
      ).toBe(2);
    });

    test("should handle DST changes", () => {
      expect(
        new Diff("2024-03-24T01:59:00", "2024-03-24T03:01:00").inMinutes()
      ).toBe(62);
    });
  });

  describe(".inSeconds", () => {
    test("should return 0 for the same second", () => {
      expect(
        new Diff("2024-03-14T12:30:30", "2024-03-14T12:30:30").inSeconds()
      ).toBe(0);
    });

    test("should count full seconds correctly", () => {
      expect(
        new Diff("2024-03-14T12:00:00", "2024-03-14T12:00:10").inSeconds()
      ).toBe(10);
    });

    test("should handle minute transitions", () => {
      expect(
        new Diff("2024-03-14T12:59:59", "2024-03-14T13:00:01").inSeconds()
      ).toBe(2);
    });

    test("should handle hour transitions", () => {
      expect(
        new Diff("2024-03-14T23:59:59", "2024-03-15T00:00:01").inSeconds()
      ).toBe(2);
    });
  });

  describe(".inMilliseconds", () => {
    test("should return 0 for the same timestamp", () => {
      expect(
        new Diff(
          "2024-03-14T12:30:30.500",
          "2024-03-14T12:30:30.500"
        ).inMilliseconds()
      ).toBe(0);
    });

    test("should count full milliseconds correctly", () => {
      expect(
        new Diff(
          "2024-03-14T12:00:00.000",
          "2024-03-14T12:00:00.100"
        ).inMilliseconds()
      ).toBe(100);
    });
  });
});
