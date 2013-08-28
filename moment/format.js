module.exports = formatFromMoment

// toISOString uses the wrong formatting, so we format
// this timezone aware date to the correct ISO format we want
function formatFromMoment(time) {
    return time.format("YYYY-MM-DDTHH:mm:ss.SSSZ")
}
