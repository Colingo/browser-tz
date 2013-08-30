var moment = require("moment-timezone/moment-timezone.js")

var parseIsoString = require("./iso-date/parse.js")
var parseToMoment = require("./moment/parse.js")
var formatFromMoment = require("./moment/format.js")

module.exports = IsoString

function IsoString(date, timezone) {
    if (typeof date === "string") {
        date = { iso: date, timezone: timezone }
    }

    var isoDate = parseIsoString(date.iso)

    if (!isoDate) {
        // console.log("BAD DATE", date)
        return "BAD DATE"
    }

    if (!date.timezone) {
        return date.iso
    }

    if (!moment.tz.__zones[date.timezone]) {
        return "BAD DATE"
    }

    var time = parseToMoment(date, isoDate)
    return formatFromMoment(time)
}

