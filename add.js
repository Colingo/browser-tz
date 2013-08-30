var moment = require("moment-timezone/moment-timezone.js")

var IsoString = require("./iso-string.js")
var parseIsoDate = require("./iso-date/parse.js")
var formatDate = require("./date/format.js")
var parseToMoment = require("./moment/parse.js")
var formatFromMoment = require("./moment/format.js")

var DAYS_IN_MONTH = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

module.exports = add

function add(type, date, timezone, amount) {
    if (typeof date === "string") {
        if (typeof timezone === "number") {
            amount = timezone
            timezone = ""
        }

        date = { iso: date, timezone: timezone }
    } else {
        amount = timezone
    }

    if (!amount) {
        throw new Error("browser-tz/add: must add an amount")
    }

    if (!date.timezone) {
        return addNoTimezone(type, date, amount)
    } else {
        if (!moment.__zones[date.timezone]) {
            return "BAD DATE"
        }

        return addTimezone(type, date, amount)
    }
}

function addNoTimezone(type, date, amount) {
    var isoDate = parseIsoDate(date.iso)

    if (!isoDate) {
        // console.log("BAD DATE", date)
        return "BAD DATE"
    }

    // passing an offset into a Date construct will make the date
    // a different time in GMT then the time being passed in.
    // The easiest way to deal with this is to remove the offset
    // and just add it back on in the formatting step
    if (isoDate.offset) {
        date.iso = date.iso
            .substring(0, date.iso.length - isoDate.offset.length)
    }

    // firefox parses dates without an offset of them as UTC
    // Chrome & opera & IE parses iso dates without an offset on
    // them as local time. For consistency force all dates to be
    // in UTC by adding Z
    var datetime = new Date(date.iso + "Z")

    if (type === "millisecond") {
        datetime.setUTCMilliseconds(datetime.getUTCMilliseconds() + amount)
    } else if (type === "second") {
        datetime.setUTCSeconds(datetime.getUTCSeconds() + amount)
    } else if (type === "minute") {
        datetime.setUTCMinutes(datetime.getUTCMinutes() + amount)
    } else  if (type === "hour") {
        datetime.setUTCHours(datetime.getUTCHours() + amount)
    } else if (type === "day") {
        datetime.setUTCDate(datetime.getUTCDate() + amount)
    } else if (type === "week") {
        datetime.setUTCDate(datetime.getUTCDate() + 7 * amount)
    // The logic for `addMonth` should not add two months
    // When you add a month to Jan 31 in JavaScript you get
    // March 2nd. This is manually fixed by ensuring we set
    // it to the real month and then setting the date back and
    // clamping the date of the month by the maximum number
    // of days in the month
    } else if (type === "month") {
        var targetMonth = datetime.getUTCMonth() + amount
        var day = datetime.getUTCDate()

        datetime.setUTCDate(1)
        datetime.setUTCMonth(targetMonth)
        var daysInMonth = getDaysInMonth(
            datetime.getUTCFullYear(), datetime.getUTCMonth())
        datetime.setUTCDate(Math.min(day, daysInMonth))
    } else if (type === "year") {
        datetime.setUTCFullYear(datetime.getUTCFullYear() + amount)
    } else {
        throw new Error("browser-tz/add: invalid type ", type)
    }

    var formatted = formatDate(datetime, isoDate.offset)
    return formatted
}

function addTimezone(type, date, amount) {
    // week's and day's do have a different style of logic.
    // if you add a week to tuesday 2am Week 13 you expect to be
    // at tuesday 2am week 14. This can be done by just casting
    // the time to local time, adding a week and casting it back
    // to the timezone. This avoids some bugs with moment as well
    if (type === "week" || type === "day" ||
        type === "month" || type === "year"
    ) {
        return addLocalTimezone(type, date, amount)
    }

    var time = parseToMoment(date)

    if (!time) {
        return "BAD DATE"
    }

    time.add(type, amount)

    return formatFromMoment(time)
}

function addLocalTimezone(type, date, amount) {
    var localISO = IsoString(date)

    if (localISO === "BAD DATE") {
        return localISO
    }

    var isoDate = parseIsoDate(localISO)

    localISO = localISO
        .substring(0, localISO.length - isoDate.offset.length)


    var targetDate = addNoTimezone(type, { iso: localISO }, amount)

    return IsoString({ iso: targetDate, timezone: date.timezone })
}

function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}

function getDaysInMonth(year, month) {
    return month !== 1 ? DAYS_IN_MONTH[month] :
        isLeapYear(year) ? 29 : 28
}
