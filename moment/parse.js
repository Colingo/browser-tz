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
    // console.log("parseToMoment.time", String(time))

    // moment casts "local" dates to be in the machine timezone
    // rather then in the provided timezone
    // so we have to move the date back to the correct time
    if (!isoDate.offset) {
        setCorrectLocalTime(time, isoDate)
    }

    return time
}

function setCorrectLocalTime(time, isoDate) {
    // console.log("setCorrectLocalTime", String(time), isoDate)
    // time.minute(isoDate.minute)
    time.date(isoDate.day)

    // console.log("parseToMoment.first-day", String(time))
    // go back an extra hour to jump over the Timezone gap
    // this make ambigious local times always favor the
    // earliest time. so when 1am happens twice because 2am
    // switches back to 1am it picks the first 1am
    time.hour(Math.max(isoDate.hour - 1, 0))
    // console.log("parseToMoment.first-hour", String(time))

    // if (time.minute() !== isoDate.minute) {
    //     time.minute(isoDate.minute)
    // }

    if (time.date() !== isoDate.day) {
        // since we are jumping an extra hour back to favor the
        // earlier time its possible to set the hour to 0
        // but actually have it be -1 because of a timezone jump
        // which means we went to yesterday and have to set the
        // day back again. We have to set the hour to midday
        // otherwise jumping to a day might jump us over the day
        // if we apply the timezone
        time.hour(12)
        time.date(isoDate.day)
        // console.log("parseToMoment.second-day", String(time))
    }

    var latterZone, earlierZone

    if (time.hour() !== isoDate.hour) {
        // changing hour across a TZ gap is buggy. So we
        // set the hour twice, once to cross the timezone gap
        // and the second one to get the hour right
        time.hour(isoDate.hour)
        latterZone = time.zone()
        // console.log("parseToMoment.second-hour", String(time))
    }

    if (time.minute() !== isoDate.minute) {
        // We set the minute as late as we can after having done two
        // hour setting hops. This means that we have already crossed
        // the TZ gap and the minute cannot be unset to the incorrect
        // minute by a TZ gap. If we set this earlier then setting
        // the hour might cause a TZ change (DST) and thus set
        // the minute to a different value
        time.minute(isoDate.minute)
        // console.log("parseToMoment.first-minute", String(time))
    }

    if (time.hour() !== isoDate.hour) {
        // We may not have actually passed over the TZ if we
        // are really close to it because going back that extra
        // hour the first time to fix the other bug might not
        // get us over the timezone. So we are definitely on
        // the correct side of the timezone on the second hour()
        // set so we need a third set to get the time correct
        time.hour(isoDate.hour)
        earlierZone = time.zone()
        // console.log("parseToMoment.third-hour", String(time))
    }

    if (time.hour() !== isoDate.hour) {
        // If we were unable to get the hour to be the exact
        // hour we want then we must be setting it to a time that
        // doesn't exist like 2am on a DST where time jumps from
        // 1.59am to 3.01am
        // Moment goes back a timezone offset when this happens.
        // The correct thing to do here is to go forward a
        // DST offset so we should add the DST offset
        var offset = (earlierZone - latterZone)
        time.minute(time.minute() + offset)
        // console.log("parseToMoment.fourth-hour", String(time))
    }
}
