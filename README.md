# Chronos

Chronos is an extended version of the native Date class in JavaScript. It provides additional utility methods for date manipulation, time zone conversions, and difference calculations.

## Installation

Chronos can be used in any JavaScript project. To install it via npm:

`npm install chronos`

## Usage

Import the Chronos class into your project:

`import Chronos from 'chronos';`

## Static Methods

### `sortDates(date1, date2): [Chronos, Chronos]`

Creates a sorted array of Chronos instances based on the given dates.

**Parameters:**

* `date1: string | number | Date`
* `date2: string | number | Date`

> This method contains the third argument `absolute (boolean)` thruly by default. It uses by other class methods to return sorted or unsorted dates.

**Example:**

```
const [date1, date2] = Chronos.createSortedDates('2023-01-01', '2023-06-30', false);
console.log(date1, date2);
```

-

### `getDiff(date1, date2, options?)`

Calculates the difference between two dates with optional units.

**Parameters:**

* `date1: string | number | Date`
* `date2: string | number | Date`
* o`ptions?: Object`
	* `withWeeks: boolean [default: false]`: Include weeks in calculation.
	* `withMonths: boolean [default: true]`: Include months in calculation.
	* `absolute: boolean [default: false]`: Return absolute values.

**Returns:**

* `{ years, months?, weeks?, days, hours, minutes, seconds, milliseconds }`: The difference object.

**Example:**

```
const diff = Chronos.getDiff('2023-01-01', '2023-06-30', { withWeeks: true, withMonths: true });
console.log(diff);
```

-

### `getDiffInUnits(date1, date2, unit, absolute): number`

Generic method that calculates the difference between two dates in a specific unit.

**Parameters:**

* `date1: string | number | Date`
* `date2: string | number | Date`
* `unit: "milliseconds" | "seconds" | "minutes" | "hours" | "days" | "weeks"`: Unit of difference.
* `absolute: boolean [default: false]`: Return absolute values.

> This method excludes the `months` and `years` units.

**Example:**

```
const diff = Chronos.getDiffInUnits('2023-01-01', '2023-06-30', 'days');
console.log(diff); // 180
```

### Unit-Specific Methods

Each of these methods is a shortcut for getDiffInUnits.

* `getDiffInMilliseconds()`
* `getDiffInSeconds()`
* `getDiffInMinutes()`
* `getDiffInHours()`
* `getDiffInDays()`
* `getDiffInWeeks()`
* `getDiffInMonths()`
* `getDiffInYears()`

Each method follows this signature:
`Chronos.getDiffIn<unit>(date1, date2, options)`

**Example:**

```
const diffInHours = Chronos.getDiffInHours('2023-01-01', '2023-06-30');
console.log(diffInHours);
```

## Class: Chronos

### `new Chronos(date: string | number | Date)`

Creates a new instance of Chronos.

### Instant Methods

### `clone(): Chronos`

Clones the current Chronos instance.

**Example**

```
const date = new Chronos('2023-01-01');
const clone = date.clone();
console.log(clone); // Tue Jan 01 2023 00:00:00 GMT+0000
```

### `add(amount): Chronos`

Adds a specific amount to the current date.

**Parameters**

* `amount: Object`
	* `years: number [default: 0]`
	* `months: number [default: 0]`
	* `weeks: number [default: 0]`
	* `days: number [default: 0]`
	* `hours: number [default: 0]`
	* `minutes: number [default: 0]`
	* `seconds: number [default: 0]`
	* `milliseconds: number [default: 0]`

**Example**

```
const date = new Chronos('2023-01-01');
const result = date.add({ years: 1, months: 2, weeks: 3, days: 4, hours: 5, minutes: 6, seconds: 7, milliseconds: 8 });
console.log(result); // Wed Mar 22 2024 05:06:07 GMT+0000
```

**Shorcuts**

Each of these methods is a shortcut for add(). 

* `addMilliseconds()`
* `addSeconds()`
* `addMinutes()`
* `addHours()`
* `addDays()`
* `addWeeks()`
* `addMonths()`
* `addYears()`

Each method follows this signature:
`new Chronos().add<unit>(unitValue: number)`

### `addDate(amount): Chronos`

Adds a specific date amount to the current date.

**Parameters**

* `amount: Object`
	* `years: number [default: 0]`
	* `months: number [default: 0]`
	* `weeks: number [default: 0]`
	* `days: number [default: 0]`

**Example**

```
const date = new Chronos('2023-01-01');
const result = date.addDate({ years: 1, months: 2, weeks: 3, days: 4 });
console.log(result); // Wed Mar 22 2024 00:00:00 GMT+0000
```

### `addTime(amount): Chronos`

Adds a specific time amount to the current date.

**Parameters**

* `amount: Object`
	* `hours: number [default: 0]`
	* `minutes: number [default: 0]`
	* `seconds: number [default: 0]`
	* `milliseconds: number [default: 0]`

**Example**

```
const date = new Chronos('2023-01-01');
const result = date.addTime({ hours: 1, minutes: 2, seconds: 3, milliseconds: 4 });
console.log(result); // Tue Jan 01 2023 01:02:03 GMT+0000
```

### `setTimeZoneOffset(newOffset: number): Chronos`

Sets the timezone offset of the current date.

**Example**

```
const date = new Chronos('2023-01-01');
const result = date.setTimeZoneOffset(2);
console.log(result); // Tue Jan 01 2023 02:00:00 GMT+0000
```

### `convertToTimeZone(newOffset: number): Chronos`

Converts the timezone offset of the current date.

**Example**

```
const date = new Chronos('2023-01-01');
const result = date.convertToTimeZone(2);
console.log(result); // Tue Jan 01 2023 02:00:00 GMT+0000
```

### `getWeekday(): number [1-7]`

Returns the day of the week for the current date.

**Example**

```
const date = new Chronos('2023-01-01');
const result = date.getWeekday();
console.log(result); // 7 (Sunday)
```

### `getDayOfYear(): number [1-366]`

Returns the day of the year for the current date.

**Example**

```
const date = new Chronos('2023-01-01');
const result = date.getDayOfYear();
console.log(result); // 1
```

### `getWeekNumber(): number [1-53]`

Returns the week number for the current date.

**Example**

```
const date = new Chronos('2023-01-01');
const result = date.getWeekNumber();
console.log(result); // 1
```

### `isLeapYear(): boolean`

Checks if the current date is a leap year.

**Example**

```
const date = new Chronos('2020-01-01');
const result = date.isLeapYear();
console.log(result); // true
```

### `isUTC(): boolean`

Checks if the current date is UTC.

**Example**

```
const date = new Chronos('2023-01-01');
const result = date.isUTC();
console.log(result); // true
```

### `toUTC(): Chronos`

Converts the current date to UTC.

**Example**

```
const date = new Chronos('2023-01-01');
const result = date.toUTC();
console.log(result); // Tue Jan 01 2023 00:00:00 GMT+0000
```

### `toDate(): Date`

Converts the current date to a Date object.

**Example**

```
const date = new Chronos('2023-01-01');
const result = date.toDate();
console.log(result); // Tue Jan 01 2023 00:00:00 GMT+0000
```

## License

MIT
