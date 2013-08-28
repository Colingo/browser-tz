var timezoneData = require("moment-timezone/moment-timezone.json")

var BrowserTimezone = require("../index")
module.exports = BrowserTimezone(timezoneData)
