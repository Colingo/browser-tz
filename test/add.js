var test = require("tape")

var tz = require("./tz.js")

test("addWeek", function (assert) {
    assert.equal(tz.addWeek("JUNK", 1), "BAD DATE")
    assert.equal(tz.addWeek("2013-08-10T00:00:00", 1),
        "2013-08-17T00:00:00.000")
    assert.equal(tz.addWeek("2013-08-10T00:00:00Z", 1),
        "2013-08-17T00:00:00.000Z")

    assert.equal(tz.addWeek({
        iso: "JUNK",
        timezone: "America/Toronto"
    }, 1), "BAD DATE")
    assert.equal(tz.addWeek({
        iso: "2013-10-01T00:00:00Z",
        timezone: "America/Toronto"
    }, 1), "2013-10-07T20:00:00.000-04:00")
    assert.equal(tz.addWeek({
        iso: "2013-11-01T00:00:00Z",
        timezone: "America/Toronto"
    }, 1), "2013-11-07T20:00:00.000-05:00")

    assert.end()
})

test("addHour", function (assert) {
    assert.equal(tz.addHour("2013-11-03T05:00:00Z", 1),
        "2013-11-03T06:00:00.000Z")
    assert.equal(tz.addHour("2013-11-03T23:00:00Z", 1),
        "2013-11-04T00:00:00.000Z")

    assert.equal(tz.addHour({
        iso: "2013-11-03T05:00:00Z",
        timezone: "America/Toronto"
    }, 1), "2013-11-03T01:00:00.000-05:00")

    assert.end()
})
