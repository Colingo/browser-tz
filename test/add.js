var test = require("tape")

var tz = require("./tz.js")

/*
 - test adding to a time with an offset or no offset
 - test going forward and backwards over an overfill. i.e.
    add 1 minute to 59 and test it goes to 00 and vica versa
 - test hopping forward and backwards over a DST on both ends
 - test hopping onto the DST edge in both forward and backward
    direction
*/

test("addMillisecond", function (assert) {
    assert.equal(tz.addMillisecond("2013-11-03T05:00:00.400Z", 100),
        "2013-11-03T05:00:00.500Z")
    assert.equal(tz.addMillisecond("2013-11-03T05:00:00.400-05:00", 100),
        "2013-11-03T05:00:00.500-05:00")
    assert.equal(tz.addMillisecond("2013-11-03T05:00:00.400", 100),
        "2013-11-03T05:00:00.500")

    assert.equal(tz.addMillisecond("2013-11-03T05:00:00.950Z", 100),
        "2013-11-03T05:00:01.050Z")
    assert.equal(tz.addMillisecond("2013-11-03T05:00:01.050Z", -100),
        "2013-11-03T05:00:00.950Z")

    assert.equal(tz.addMillisecond({
        iso: "2013-11-03T05:59:59.850Z",
        timezone: "America/Toronto"
    }, 100), "2013-11-03T01:59:59.950-04:00")
    assert.equal(tz.addMillisecond({
        iso: "2013-11-03T05:59:59.950Z",
        timezone: "America/Toronto"
    }, 100), "2013-11-03T01:00:00.050-05:00")
    assert.equal(tz.addMillisecond({
        iso: "2013-11-03T05:59:59.900Z",
        timezone: "America/Toronto"
    }, 100), "2013-11-03T01:00:00.000-05:00")
    assert.equal(tz.addMillisecond({
        iso: "2013-11-03T06:00:00.100Z",
        timezone: "America/Toronto"
    }, -100), "2013-11-03T01:00:00.000-05:00")
    assert.equal(tz.addMillisecond({
        iso: "2013-11-03T06:00:00.050Z",
        timezone: "America/Toronto"
    }, -100), "2013-11-03T01:59:59.950-04:00")
    assert.equal(tz.addMillisecond({
        iso: "2013-11-03T06:00:00.050Z",
        timezone: "America/Toronto"
    }, 100), "2013-11-03T01:00:00.150-05:00")

    assert.end()
})

test("addHour", function (assert) {
    assert.equal(tz.addHour("2013-11-03T05:00:00Z", 1),
        "2013-11-03T06:00:00.000Z")
    assert.equal(tz.addHour("2013-11-03T05:00:00", 1),
        "2013-11-03T06:00:00.000")
    assert.equal(tz.addHour("2013-11-03T23:00:00Z", 1),
        "2013-11-04T00:00:00.000Z")
    assert.equal(tz.addHour("2013-11-04T00:30:00Z", -1),
        "2013-11-03T23:30:00.000Z")

    assert.equal(tz.addHour({
        iso: "2013-11-03T02:00:00Z",
        timezone: "America/Toronto"
    }, 1), "2013-11-02T23:00:00.000-04:00")
    assert.equal(tz.addHour({
        iso: "2013-11-03T03:00:00Z",
        timezone: "America/Toronto"
    }, 1), "2013-11-03T00:00:00.000-04:00")
    assert.equal(tz.addHour({
        iso: "2013-11-03T04:00:00Z",
        timezone: "America/Toronto"
    }, 1), "2013-11-03T01:00:00.000-04:00")
    assert.equal(tz.addHour({
        iso: "2013-11-03T05:00:00Z",
        timezone: "America/Toronto"
    }, 1), "2013-11-03T01:00:00.000-05:00")
    assert.equal(tz.addHour({
        iso: "2013-11-03T06:00:00Z",
        timezone: "America/Toronto"
    }, 1), "2013-11-03T02:00:00.000-05:00")

    assert.end()
})

test("addWeek", function (assert) {
    assert.equal(tz.addWeek("JUNK", 1), "BAD DATE")
    assert.equal(tz.addWeek("2013-08-10T00:00:00", 1),
        "2013-08-17T00:00:00.000")
    assert.equal(tz.addWeek("2013-08-10T00:00:00Z", 1),
        "2013-08-17T00:00:00.000Z")
    assert.equal(tz.addWeek("2013-12-25T00:00:00Z", 1),
        "2014-01-01T00:00:00.000Z")
    assert.equal(tz.addWeek("2014-01-01T00:00:00.000Z", -1),
        "2013-12-25T00:00:00.000Z")

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
