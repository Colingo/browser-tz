var test = require("tape")

var tz = require("./tz.js")

test("tz.IsoString", function (assert) {
    assert.equal(tz.IsoString("garbage"), "BAD DATE")
    assert.equal(tz.IsoString("2013-08-10T00:00:00"), "2013-08-10T00:00:00")
    assert.equal(tz.IsoString("2013-08-10T00:00:00Z"), "2013-08-10T00:00:00Z")
    assert.equal(tz.IsoString("2013-08-10T00:00:00-05:00"),
        "2013-08-10T00:00:00-05:00")

    assert.equal(tz.IsoString({
        iso: "2013-08-10T00:00:00",
        timezone: "jomomma"
    }), "BAD DATE")
    assert.equal(tz.IsoString({
        iso: "2013-08-10T00:00:00Z",
        timezone: "jomomma"
    }), "BAD DATE")

    assert.equal(tz.IsoString({
        iso: "2013-08-10T00:00:00",
        timezone: "America/Toronto"
    }), "2013-08-10T00:00:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-08-10T00:00:00Z",
        timezone: "America/Toronto"
    }), "2013-08-09T20:00:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-11-02T06:00:00Z",
        timezone: "America/Toronto"
    }), "2013-11-02T02:00:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-11-03T06:00:00Z",
        timezone: "America/Toronto"
    }), "2013-11-03T01:00:00.000-05:00")
    assert.equal(tz.IsoString({
        iso: "2013-11-03T06:01:00Z",
        timezone: "America/Toronto"
    }), "2013-11-03T01:01:00.000-05:00")
    assert.equal(tz.IsoString({
        iso: "2013-11-03T05:59:00Z",
        timezone: "America/Toronto"
    }), "2013-11-03T01:59:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-11-03T05:00:00Z",
        timezone: "America/Toronto"
    }), "2013-11-03T01:00:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-03-10T05:00:00Z",
        timezone: "America/Toronto"
    }), "2013-03-10T00:00:00.000-05:00")
    assert.equal(tz.IsoString({
        iso: "2013-03-10T06:00:00Z",
        timezone: "America/Toronto"
    }), "2013-03-10T01:00:00.000-05:00")
    assert.equal(tz.IsoString({
        iso: "2013-03-10T06:59:00Z",
        timezone: "America/Toronto"
    }), "2013-03-10T01:59:00.000-05:00")
    assert.equal(tz.IsoString({
        iso: "2013-03-10T07:00:00Z",
        timezone: "America/Toronto"
    }), "2013-03-10T03:00:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-03-10T07:01:00Z",
        timezone: "America/Toronto"
    }), "2013-03-10T03:01:00.000-04:00")

    assert.end()
})

test("tz.IsoString ambigious", function (assert) {
    assert.equal(tz.IsoString({
        iso: "2013-11-03T00:00:00",
        timezone: "America/Toronto"
    }), "2013-11-03T00:00:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-11-03T00:59:00",
        timezone: "America/Toronto"
    }), "2013-11-03T00:59:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-11-03T02:00:00",
        timezone: "America/Toronto"
    }), "2013-11-03T02:00:00.000-05:00")
    assert.equal(tz.IsoString({
        iso: "2013-11-03T02:01:00",
        timezone: "America/Toronto"
    }), "2013-11-03T02:01:00.000-05:00")

    // These are ambigious
    assert.equal(tz.IsoString({
        iso: "2013-11-03T01:00:00",
        timezone: "America/Toronto"
    }), "2013-11-03T01:00:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-11-03T01:30:00",
        timezone: "America/Toronto"
    }), "2013-11-03T01:30:00.000-04:00")

    assert.equal(tz.IsoString({
        iso: "2013-03-10T03:30:00",
        timezone: "America/Toronto"
    }), "2013-03-10T03:30:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-03-10T01:30:00",
        timezone: "America/Toronto"
    }), "2013-03-10T01:30:00.000-05:00")
    assert.equal(tz.IsoString({
        iso: "2013-03-10T03:01:00",
        timezone: "America/Toronto"
    }), "2013-03-10T03:01:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-03-10T03:00:00",
        timezone: "America/Toronto"
    }), "2013-03-10T03:00:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-03-10T01:59:00",
        timezone: "America/Toronto"
    }), "2013-03-10T01:59:00.000-05:00")

    // these are ambigious
    assert.equal(tz.IsoString({
        iso: "2013-03-10T02:00:00",
        timezone: "America/Toronto"
    }), "2013-03-10T03:00:00.000-04:00")
    assert.equal(tz.IsoString({
        iso: "2013-03-10T02:30:00",
        timezone: "America/Toronto"
    }), "2013-03-10T03:30:00.000-04:00")


    assert.end()
})

// function printLine(word,end) {
//     console.log("--------------------------" +
//         word + (end ? " END--" : " START") +
//         "-------------------")
// }
