class Diff {
  constructor(start, end) {
    const Eonix = require("../Eonix/Eonix.js");
    const startEonix = new Eonix(start);
    const endEonix = new Eonix(end);

    this.isInversed = startEonix > endEonix;

    const [earlierDate, laterDate] = Eonix.sort(startEonix, endEonix);

    this.start = earlierDate;
    this.end = laterDate;
  }

  inUnits(units) {
    const Eonix = require("../Eonix/Eonix.js");

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

    const tempDate = new Eonix(this.start);
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

    if (units.includes("milliseconds") || units.length === 0) {
      const milliseconds = new Diff(tempDate, this.end).inMilliseconds();
      diff.milliseconds = milliseconds;
    }

    return diff;
  }

  inMilliseconds({ absolute = false } = {}) {
    const milliseconds = Math.floor(
      (this.end.getTime() - this.start.getTime()) / 1
    );
    return (this.isInversed ?? !absolute) ? -milliseconds : milliseconds;
  }

  inSeconds({ absolute = false } = {}) {
    const seconds = Math.floor(
      (this.end.getTime() - this.start.getTime()) / 1000
    );
    return (this.isInversed ?? !absolute) ? -seconds : seconds;
  }

  inMinutes({ absolute = false } = {}) {
    const minutes = Math.floor(
      (this.end.getTime() - this.start.getTime()) / 60000
    );
    return (this.isInversed ?? !absolute) ? -minutes : minutes;
  }

  inHours({ absolute = false } = {}) {
    const hours = Math.floor(
      (this.end.getTime() - this.start.getTime()) / 3600000
    );
    return (this.isInversed ?? !absolute) ? -hours : hours;
  }

  inDays({ absolute = false } = {}) {
    const days = Math.floor(
      (this.end.getTime() - this.start.getTime()) / 86400000
    );
    return (this.isInversed ?? !absolute) ? -days : days;
  }

  inWeeks({ absolute = false } = {}) {
    const weeks = Math.floor(
      (this.end.getTime() - this.start.getTime()) / 604800000
    );
    return (this.isInversed ?? !absolute) ? -weeks : weeks;
  }

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

    const totalMonths = months + years * 12;

    return (this.isInversed ?? !absolute) ? -totalMonths : totalMonths;
  }

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

    return (this.isInversed ?? !absolute) ? -years : years;
  }
}

module.exports = Diff;
