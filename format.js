var moment = require("moment-timezone/moment-timezone.js")

module.exports = format

function format(date, formatter) {
    return moment(date).format(formatter || "")
}
