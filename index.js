var moment = require("moment-timezone/moment-timezone.js")

var isISOString = new RegExp(
    "(\\d\\d\\d\\d)-" + // year
    "(\\d\\d)-" + // month
    "(\\d\\d)T" + // day
    "(\\d\\d):" + // hour
    "(\\d\\d):" + // minute
    "(\\d\\d)" + // second
    "\\.?(\\d\\d\\d)?" + // optional milliseconds
    "([Z(-\\d\\d:\\d\\d)])?" // optional timezone information
)
var SECOND = 1000
var MINUTE = 60 * SECOND
var HOUR = 60 *  MINUTE
var DAY = 24 * HOUR
// var WEEK = 7 * DAY

module.exports = BrowserTimezone

function BrowserTimezone(timezoneData) {
    moment.tz.add(timezoneData)
    moment.tz.__zones = timezoneData.zones

    return {
        time: time
    }
}

function time(date, timezone) {
    if (typeof date === "string") {
        date = { iso: date, timezone: timezone }
    }

    var isoParts = date.iso.match(isISOString)

    if (!isoParts) {
        return "BAD DATE"
    }

    if (!date.timezone) {
        return date.iso
    }

    if (!moment.tz.__zones[date.timezone]) {
        return "BAD DATE"
    }

    // var isoYear = Number(isoParts[1])
    // var isoMonth = Number(isoParts[2])
    var isoDay = Number(isoParts[3])
    var isoHour = Number(isoParts[4])
    var isoMinute = Number(isoParts[5])
    // var isoSecond = Number(isoParts[6])
    // var isoMillisecond = isoParts[7] ? Number(isoParts[7]) : 0
    var isLocal = !isoParts[8]

    var momentDate = moment(date.iso).tz(date.timezone)

    if (isLocal) {
        // var isoOffset = (isoDay * DAY) +
        //     (isoHour * HOUR) +
        //     (isoMinute * MINUTE)
        // var momentOffset = (momentDate.date() * DAY) +
        //     (momentDate.hour() * HOUR) +
        //     (momentDate.minute() * MINUTE)

        // var diff = isoOffset - momentOffset
        // momentDate.add("millisecond", diff)

        momentDate.date(isoDay)
        // go back an extra hour to jump over the Timezone gap
        // this make ambigious local times always favor the
        // earliest time. so when 1am happens twice because 2am
        // switches back to 1am it picks the first 1am
        momentDate.hour(Math.max(isoHour - 1, 0))
        // changing hour across a TZ gap is buggy. So we
        // set the hour twice, once to cross the timezone gap
        // and the second one to get the hour right
        momentDate.hour(isoHour)
        momentDate.minute(isoMinute)
    }

    return momentDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ")
}
