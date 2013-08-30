module.exports = formatDate

function formatDate(date, offset) {
    return date.getUTCFullYear() + "-" +
        doubleDigit(date.getUTCMonth() + 1) + "-" +
        doubleDigit(date.getUTCDate()) + "T" +
        doubleDigit(date.getUTCHours()) + ":" +
        doubleDigit(date.getUTCMinutes()) + ":" +
        doubleDigit(date.getUTCSeconds()) + "." +
        tripleDigit(date.getUTCMilliseconds()) +
        (offset || "")
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
