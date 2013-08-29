# browser-tz

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

[![browser support][11]][12]

Timezone specific manipulation of datetime strings

Designed to be used on top of another library. Initial
implementation is build on top of moment-timezone

## Motivation

This is a set of minimal operation needed to deal with timezone
in javascript. It focuses on only having one canonical
representation of a time, namely an ISO8601 string.

## Docs

### [see docs.mli file][13]

## Example

```js
var Timezone = require("browser-tz")
var timezoneData = require("moment-timezone/moment-timezones.json")

var tz = Timezone(timezoneData)

var today = new Date().toISOString()
// convert an ISO GMT string to an ISO string with the correct
// offset for that time in New York
var todayInNewYork = tz.IsoString(today, "America/New_York")

// To a timezone operation of adding a day to a day
// within a given time. This either add's a GMT day or +-1 hour
// based on whether a DST change happens during that day in
// new york
var tomorrowInNewYork = tz.addDay({
  iso: todayInNewYork,
  timezone: "America/New_York"
}, 1)
```

## The timezone strategy

To make dealing with times and timezones easier this module
  exposes the minimal number of data types and the minimal
  number of operations on times, dates and timezones.

Generally in your server you should be storing times as ISO8601
  strings, preferably in GMT.

### Clientside rendering

For rendering these times you want to render that GMT ISO8601
  time in a specific timezone. This means you should probably
  pass tuples of { iso: String, timezone: String } to your
  templates or views and they should use the `IsoString` function
  to format that tuple correctly. Once formatted as a correct
  ISO8601 string with the correct offset for that datetime and
  timezone you should be able to pass it into any formatting or
  time related view component.

If you pass the `IsoString` function an ISO string without an
  offset. i.e. no `Z` and no `-04:00` it will assume that it's
  a time in the timezone you give it and just add the correct
  timezone offset for that datetime and timezone.

If you don't pass a timezone that it's already a correct ISO8601
  string so it will just be returned

### Computing future events from a users point of view

If a user wants to do a recurring event at a time in his timezone
  or a user wants to do an event next Monday at 9am in his
  timezone then you need the ability to add some time offset
  to a time or compute a certain time in his timezone in the
  future.

The doing an event next Monday at 9am is just another usage of
  the `IsoString` function where you ask it to give you the local
  ISO8601 representation of that Monday 9am in the users timezone

If you wanted to compute a recurring weekly schedule you can use
  the `addWeek` function to take a time and a timezone and
  compute the ISO8601 string for that that a time a week later in
  the users timezone. Using this function reprects DST change.
  So if a DST change happens and the week is actually 7 days + 1
  hour in GMT it will add 7 days and 1 hour to the time (i.e.
  return next weeks time with the offset changed).

### Dealing with ambigious local times

A user might ask you for `1am` on a day of DST where the hour
  goes back and you actually have `1am` twice because `2am` goes
  back to `1am`. If a user asks for this local time then the
  `IsoString` function will return the first `1am`.

A user might ask you for `2am` on a day of DST where the hour
  goes forward and `2am` becomes `3am`. This means `2am` local
  time does not actually exist. In this case `3am` is returned
  and `2.30am` also turns into `3.30am`.

## Installation

`npm install browser-tz`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Colingo/browser-tz.png
  [2]: https://travis-ci.org/Colingo/browser-tz
  [3]: https://badge.fury.io/js/browser-tz.png
  [4]: https://badge.fury.io/js/browser-tz
  [5]: https://coveralls.io/repos/Colingo/browser-tz/badge.png
  [6]: https://coveralls.io/r/Colingo/browser-tz
  [7]: https://gemnasium.com/Colingo/browser-tz.png
  [8]: https://gemnasium.com/Colingo/browser-tz
  [9]: https://david-dm.org/Colingo/browser-tz.png
  [10]: https://david-dm.org/Colingo/browser-tz
  [11]: https://ci.testling.com/Colingo/browser-tz.png
  [12]: https://ci.testling.com/Colingo/browser-tz
  [13]: https://github.com/Colingo/browser-tz/blob/master/docs.mli
