# browser-tz

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

Timezone specific manipulation of datetime strings

Designed to be used on top of another library. Initial
implementation is build on top of moment-timezone

## Motivation

This is a set of minimal operation needed to deal with timezone
in javascript. It focuses on only having one canonical
representation of a time, namely an ISO8601 string.

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
