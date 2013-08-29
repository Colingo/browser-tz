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
        format: format,
        addMillisecond: add.bind(null, "millisecond"),
        addSecond: NotImplemented("addSecond"),
        // addSecond: add.bind(null, "second"),
        addMinute: NotImplemented("addMinute"),
        // addMinute: add.bind(null, "minute"),
        addHour: add.bind(null, "hour"),
        addDay: NotImplemented("addDay"),
        // addDay: add.bind(null, "day"),
        addWeek: add.bind(null, "week"),
        addMonth: NotImplemented("addMonth"),
        // addMonth: add.bind(null, "month"),
        addYear: NotImplemented("addYear")
        // addYear: add.bind(null, "year")
    }
}

function NotImplemented(name) {
    return function () {
        throw new Error("browser-tz: not implemented " + name)
    }
}
