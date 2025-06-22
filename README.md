# Eonix

A modern JavaScript date manipulation library that extends the native Date class with powerful utility methods for date calculations, timezone conversions, and difference calculations.

## Features

- Extends native Date class with additional functionality
- Comprehensive date difference calculations
- Timezone conversion utilities
- Leap year handling
- Week and day calculations
- Date arithmetic operations
- Full TypeScript support

## Installation

```bash
npm install eonix
```

## Usage

```javascript
import Eonix from "eonix";

// Create a new Eonix instance
const date = new Eonix("2023-01-01");

// Add time to a date
date.add({ years: 1, months: 2, days: 3 });
console.log(date); // 2024-03-04

// Calculate difference between dates
const diff = Eonix.diff("2023-01-01", "2023-06-30");
console.log(diff.inMonths()); // 5
console.log(diff.inDays()); // 180

// Sort dates
const [earlier, later] = Eonix.sort("2023-06-30", "2023-01-01");
```

## API Documentation

### Static Methods

#### `Eonix.sort(...dates)`

Creates a sorted array of Eonix instances based on the given dates.

```javascript
const [date1, date2] = Eonix.sort("2023-01-01", "2023-06-30");
```

#### `Eonix.diff(start, end)`

Calculates the difference between two dates.

```javascript
const diff = Eonix.diff("2023-01-01", "2023-06-30");
```

### Instance Methods

#### Date Arithmetic

- `add({ years, months, weeks, days, hours, minutes, seconds, milliseconds })`
- `addDate({ years, months, weeks, days })`
- `addTime({ hours, minutes, seconds, milliseconds })`
- `addYears(years)`
- `addMonths(months)`
- `addWeeks(weeks)`
- `addDays(days)`
- `addHours(hours)`
- `addMinutes(minutes)`
- `addSeconds(seconds)`
- `addMilliseconds(milliseconds)`

#### Date Information

- `getWeekday()` - Returns day of week (1-7)
- `getDayOfYear()` - Returns day of year
- `getWeekNumber()` - Returns week number
- `isLeapYear()` - Checks if date is in a leap year
- `isUTC()` - Checks if date is in UTC
- `inRange()` - Checks if date is in date range

#### Timezone Operations

- `convertToUTC()` - Converts date to UTC
- `convertToTimeZone(offset)` - Converts to specified timezone offset
- `toDate()` - Converts to native Date object

### Diff Class Methods

#### Generic Difference Calculation

- `inUnits(units)` - Calculates the difference between two dates in specified units
  ```javascript
  const diff = Eonix.diff("2023-01-01", "2023-06-30");
  const result = diff.inUnits(["years", "months", "days"]);
  // Result: { years: 0, months: 5, days: 29 }
  ```
  Available units: "years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"
  If no units are specified, all units will be calculated.

#### Difference Calculations

- `inYears({ absolute = false })`
- `inMonths({ absolute = false })`
- `inWeeks({ absolute = false })`
- `inDays({ absolute = false })`
- `inHours({ absolute = false })`
- `inMinutes({ absolute = false })`
- `inSeconds({ absolute = false })`
- `inMilliseconds({ absolute = false })`

## Examples

### Date Arithmetic

```javascript
const date = new Eonix("2023-01-01");
date.add({ years: 1, months: 2, days: 3 });
// Result: 2024-03-04
```

### Date Differences

```javascript
const diff = Eonix.diff("2023-01-01", "2023-06-30");
console.log(diff.inMonths()); // 5
console.log(diff.inDays()); // 180
```

### Timezone Conversion

```javascript
const date = new Eonix("2023-01-01");
date.convertToTimeZone(2); // Convert to UTC+2
```

### Leap Year Handling

```javascript
const date = new Eonix("2020-02-29");
console.log(date.isLeapYear()); // true
```

### Check if date is in date range

```javascript
const date = new Eonix('2023-06-15');
const start = new Eonix('2023-06-01');
const end = new Eonix('2023-06-30');
console.log(date.inRange(start, end)); // true
```

## License

MIT

## Author

- Roman Nebel
- Email: r@nebel.im
- Website: https://nebel.im
