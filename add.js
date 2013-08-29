var parseIsoDate = require("./iso-date/parse.js")
var formatIsoDate = require("./iso-date/format.js")
var parseToMoment = require("./moment/parse.js")
var formatFromMoment = require("./moment/format.js")

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
        return addTimezone(type, date, amount)
    }
}

function addNoTimezone(type, date, amount) {
    var isoDate = parseIsoDate(date.iso)

    if (!isoDate) {
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

    if (type === "week") {
        datetime.setDate(datetime.getDate() + 7 * amount)
    } else if (type === "hour") {
        datetime.setHours(datetime.getHours() + amount)
    } else if (type === "millisecond") {
        datetime.setMilliseconds(datetime.getMilliseconds() + amount)
    }

    var formatted = formatIsoDate(datetime, isoDate.offset)
    return formatted
}

function addTimezone(type, date, amount) {
    var time = parseToMoment(date)

    if (!time) {
        return "BAD DATE"
    }

    time.add(type, amount)

    return formatFromMoment(time)
}
