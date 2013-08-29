var test = require("tape")
var format = require("util").format

var tz = require("./tz.js")

/*
 - test bad date
 - test bad timezone
 - test adding to a time with an offset or no offset
 - test going forward and backwards over an overfill. i.e.
    add 1 minute to 59 and test it goes to 00 and vica versa
 - test hopping forward and backwards over a DST on both ends
 - test hopping onto the DST edge in both forward and backward
    direction
*/

test("addMillisecond", function (assert) {
    assertBadDates(assert, "addMillisecond")

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

    assertDSTBoundary(assert, "milliSecond", {
        iso: "2013-11-03T06:00:00.000Z",
        timezone: "America/Toronto"
    })
    assertDSTBoundary(assert, "milliSecond", {
        iso: "2013-03-10T07:00:00.000Z",
        timezone: "America/Toronto"
    })

    assert.end()
})

test("addHour", function (assert) {
    assertBadDates(assert, "addHour")

    assert.equal(tz.addHour("2013-11-03T05:00:00Z", 1),
        "2013-11-03T06:00:00.000Z")
    assert.equal(tz.addHour("2013-11-03T05:00:00", 1),
        "2013-11-03T06:00:00.000")
    assert.equal(tz.addHour("2013-11-03T05:00:00-05:00", 1),
        "2013-11-03T06:00:00.000-05:00")

    assert.equal(tz.addHour("2013-11-03T23:30:00Z", 1),
        "2013-11-04T00:30:00.000Z")
    assert.equal(tz.addHour("2013-11-04T00:30:00Z", -1),
        "2013-11-03T23:30:00.000Z")

    assert.equal(tz.addHour({
        iso: "2013-03-10T07:00:00.000Z",
        timezone: "America/Toronto"
    }, 7 * 36), "2013-03-20T15:00:00.000-04:00")
    assert.equal(tz.addHour({
        iso: "2013-03-10T07:00:00.000Z",
        timezone: "America/Toronto"
    }, 7 * 12), "2013-03-13T15:00:00.000-04:00")
    assert.equal(tz.addHour("2013-03-10T07:00:00.000Z", 7 * 12),
        "2013-03-13T19:00:00.000Z")

    assert.equal(tz.addHour({
        iso: "2013-03-10T06:00:00.000Z",
        timezone: "America/Toronto"
    }, 1), "2013-03-10T03:00:00.000-04:00")
    assert.equal(tz.addHour({
        iso: "2013-03-09T04:00:00.000-05:00",
        timezone: "America/Toronto"
    }, 24), "2013-03-10T05:00:00.000-04:00")

    assertDSTBoundary(assert, "hour", {
        iso: "2013-11-03T06:00:00Z",
        timezone: "America/Toronto"
    })
    assertDSTBoundary(assert, "hour", {
        iso: "2013-03-10T07:00:00.000Z",
        timezone: "America/Toronto"
    })

    assert.end()
})

test("addWeek", function (assert) {
    assertBadDates(assert, "addWeek")

    assert.equal(tz.addWeek("2013-08-10T00:00:00", 1),
        "2013-08-17T00:00:00.000")
    assert.equal(tz.addWeek("2013-08-10T00:00:00Z", 1),
        "2013-08-17T00:00:00.000Z")
    assert.equal(tz.addWeek("2013-08-10T00:00:00-05:00", 1),
        "2013-08-17T00:00:00.000-05:00")

    assert.equal(tz.addWeek("2013-12-25T00:00:00Z", 1),
        "2014-01-01T00:00:00.000Z")
    assert.equal(tz.addWeek("2014-01-01T00:00:00.000Z", -1),
        "2013-12-25T00:00:00.000Z")

    assert.equal(tz.addWeek({
        iso: "2013-03-03T02:00:00.000-05:00",
        timezone: "America/Toronto"
    }, 1), "2013-03-10T03:00:00.000-04:00")
    assert.equal(tz.addWeek({
        iso: "2013-03-13T18:00:00.000Z",
        timezone: "America/Toronto"
    }, 1), "2013-03-20T14:00:00.000-04:00")
    assert.equal(tz.addWeek({
        iso: "2013-03-07T09:00:00.000Z",
        timezone: "America/Toronto"
    }, 1), "2013-03-14T04:00:00.000-04:00")
    assert.equal(tz.addWeek({
        iso: "2013-03-10T07:00:00.000Z",
        timezone: "America/Toronto"
    }, -1), "2013-03-03T03:00:00.000-05:00")


    assert.equal(tz.addWeek({
        iso: "2013-10-27T02:00:00.000-04:00",
        timezone: "America/Toronto"
    }, 1), "2013-11-03T02:00:00.000-05:00")
    assert.equal(tz.addWeek({
        iso: "2013-11-03T06:00:00Z",
        timezone: "America/Toronto"
    }, -1), "2013-10-27T01:00:00.000-04:00")

    assertDSTBoundary(assert, "week", {
        iso: "2013-11-03T06:00:00Z",
        timezone: "America/Toronto"
    })
    assertDSTBoundary(assert, "week", {
        iso: "2013-03-10T07:00:00.000Z",
        timezone: "America/Toronto"
    })

    assert.end()
})

function assertBadDates(assert, operation) {
    assert.equal(tz[operation]("JUNK", 1), "BAD DATE")
    assert.equal(tz[operation]({
        iso: "JUNK",
        timezone: "America/Toronto"
    }, 1), "BAD DATE")
    assert.equal(tz[operation]({
        iso: "2013-11-03T05:00:00.400Z",
        timezone: "JUNK"
    }, 1), "BAD DATE")
}

function assertDSTBoundary(assert, type, time) {
    var iso = time.iso
    var timezone = time.timezone

    var operation, timeChange

    if (type === "hour") {
        operation =  { fn: "addHour", amount: 1 }
        timeChange = { fn: "addMinute", amount: 60 }
    } else if (type === "milliSecond") {
        operation = timeChange = { fn: "addMillisecond", amount: 100 }
    } else if (type === "week") {
        operation = timeChange = { fn: "addWeek", amount: 2 }
    }

    var gmtTimes = {
        "-1.5": tz[timeChange.fn](iso, timeChange.amount * -1.5),
        "-1": tz[timeChange.fn](iso, timeChange.amount * -1),
        "-0.5": tz[timeChange.fn](iso, timeChange.amount * -0.5),
        "0": iso,
        "0.5": tz[timeChange.fn](iso, timeChange.amount * 0.5),
        "1": tz[timeChange.fn](iso, timeChange.amount * 1),
        "1.5": tz[timeChange.fn](iso, timeChange.amount * 1.5)
    }

    var expectedTimes
    if (type === "week") {
        var beforeTime = {
            iso: tz.IsoString({
                iso: gmtTimes["-0.5"],
                timezone: timezone
            }),
            timezone: timezone
        }
        var afterTime = {
            iso: tz.IsoString({
                iso: gmtTimes["0.5"],
                timezone: timezone
            }),
            timezone: timezone
        }

        expectedTimes = {
            "-0.5B": beforeTime.iso,
            "0B": tz[timeChange.fn](beforeTime, timeChange.amount * 0.5),
            "0.5B": tz[timeChange.fn](beforeTime, timeChange.amount * 1),
            "-1O": tz[timeChange.fn](afterTime, timeChange.amount * -1.5),
            "1O": tz[timeChange.fn](afterTime, timeChange.amount * 0.5),
            "-0.5A": tz[timeChange.fn](afterTime, timeChange.amount * -1),
            "0A": tz[timeChange.fn](afterTime, timeChange.amount * -0.5),
            "1.5A": tz[timeChange.fn](afterTime, timeChange.amount * 1)
        }

        assertTimeOperation(-1.5, "-0.5B")
        assertTimeOperation(-1, "0B")
        assertTimeOperation(-0.5, "0.5B")
        assertTimeOperation(0, "-1O")
        assertTimeOperation(0, "1O")
        assertTimeOperation(0.5, "-0.5A")
        assertTimeOperation(1, "0A")
        assertTimeOperation(0.5, "1.5A")
    } else {
        var targetTime = {
            iso: tz.IsoString(time),
            timezone: timezone
        }

        expectedTimes = {
            "-1.5": tz[timeChange.fn](targetTime, timeChange.amount * -1.5),
            "-1": tz[timeChange.fn](targetTime, timeChange.amount * -1),
            "-0.5": tz[timeChange.fn](targetTime, timeChange.amount * -0.5),
            "0": targetTime.iso,
            "0.5": tz[timeChange.fn](targetTime, timeChange.amount * 0.5),
            "1": tz[timeChange.fn](targetTime, timeChange.amount * 1),
            "1.5": tz[timeChange.fn](targetTime, timeChange.amount * 1.5)
        }

        assertTimeOperation(-1.5, -0.5)
        assertTimeOperation(-1, 0)
        assertTimeOperation(-0.5, 0.5)
        assertTimeOperation(0, -1)
        assertTimeOperation(0, 1)
        assertTimeOperation(0.5, -0.5)
        assertTimeOperation(1, 0)
        assertTimeOperation(0.5, 1.5)
    }

    function assertTimeOperation(start, end) {
        var direction = typeof end !== "string" ? end - start :
            Number(end.substr(0, end.length - 1)) - start

        var time = tz[operation.fn]({
            iso: gmtTimes[start],
            timezone: timezone
        }, direction * operation.amount)
        var message = format("%s -> %s for %s from %s to %s",
            start, end, type, tz.IsoString({
                iso: gmtTimes[start],
                timezone: timezone
            }), expectedTimes[end])

        assert.equal(time, expectedTimes[end], message)
    }
}
