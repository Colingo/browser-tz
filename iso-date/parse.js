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

module.exports = parseIsoString

function parseIsoString(iso) {
    var isoParts = iso.match(isISOString)

    if (isoParts === null) {
        return null
    }

    return new IsoDate(isoParts)
}

function IsoDate(isoParts) {
    this.year = Number(isoParts[1])
    this.month = Number(isoParts[2])
    this.day = Number(isoParts[3])
    this.hour = Number(isoParts[4])
    this.minute = Number(isoParts[5])
    this.second = Number(isoParts[6])
    this.millisecond = isoParts[7] ? Number(isoParts[7]) : 0
    this.offset = isoParts[8] ? String(isoParts[8]) : ""
}
