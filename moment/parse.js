var moment = require("moment-timezone/moment-timezone.js")

var parseIsoString = require("../iso-date/parse.js")

module.exports = parseToMoment

// Take a date and optionally a computed set of isoParts
// and return a correct timezone aware Moment instance of the
// date
function parseToMoment(date, isoDate) {
    if (!isoDate) {
        isoDate = parseIsoString(date.iso)
    }

    if (!isoDate) {
        return null
    }

    var time = moment(date.iso).tz(date.timezone)

    // moment casts "local" dates to be in the machine timezone
    // rather then in the provided timezone
    // so we have to move the date back to the correct time
    if (!isoDate.offset) {
        time.date(isoDate.day)
        // go back an extra hour to jump over the Timezone gap
        // this make ambigious local times always favor the
        // earliest time. so when 1am happens twice because 2am
        // switches back to 1am it picks the first 1am
        time.hour(Math.max(isoDate.hour - 1, 0))
        // changing hour across a TZ gap is buggy. So we
        // set the hour twice, once to cross the timezone gap
        // and the second one to get the hour right
        time.hour(isoDate.hour)
        time.minute(isoDate.minute)
    }

    return time
}
