// var SECOND = 1000
// var MINUTE = 60 * SECOND
// var HOUR = 60 *  MINUTE
// var DAY = 24 * HOUR
// var WEEK = 7 * DAY

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

    var datetime = new Date(date.iso)

    if (type === "week") {
        datetime.setDate(datetime.getDate() + 7 * amount)
    } else if (type === "hour") {
        datetime.setHours(datetime.getHours() + amount)
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
