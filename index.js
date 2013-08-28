var moment = require("moment-timezone/moment-timezone.js")

var add = require("./add.js")
var IsoString = require("./iso-string.js")
var format = require("./format.js")

module.exports = BrowserTimezone

function BrowserTimezone(timezoneData) {
    moment.tz.add(timezoneData)
    moment.tz.__zones = timezoneData.zones

    return {
        IsoString: IsoString,
        addWeek: add.bind(null, "week"),
        addHour: add.bind(null, "hour"),
        format: format
    }
}

