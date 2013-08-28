module.exports = formatIsoDate

function formatIsoDate(isoDate, offset) {
    if (isDate(isoDate)) {
        return isoDate.getUTCFullYear() + "-" +
            doubleDigit(isoDate.getUTCMonth() + 1) + "-" +
            doubleDigit(isoDate.getUTCDate()) + "T" +
            doubleDigit(isoDate.getUTCHours()) + ":" +
            doubleDigit(isoDate.getUTCMinutes()) + ":" +
            doubleDigit(isoDate.getUTCSeconds()) + "." +
            tripleDigit(isoDate.getUTCMilliseconds()) +
            (offset || "")
    }

    return isoDate.year + "-" +
        doubleDigit(isoDate.month) + "-" +
        doubleDigit(isoDate.day) + "T" +
        doubleDigit(isoDate.hour) + ":" +
        doubleDigit(isoDate.minute) + ":" +
        doubleDigit(isoDate.second) + "." +
        doubleDigit(isoDate.millisecond) +
        tripleDigit(isoDate.offset)
}

function isDate(d) {
    return Object.prototype.toString.call(d) === "[object Date]"
}

function doubleDigit(str) {
    str = String(str)
    return str.length === 1 ? "0" + str : str
}

function tripleDigit(str) {
    str = String(str)
    return str.length === 1 ? "00" + str :
        str.length === 2 ? "0" + str : str
}
