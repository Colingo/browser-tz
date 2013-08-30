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

    assert.equal(tz.IsoString({
        iso: "2013-09-01T00:00:00.000",
        timezone: "America/Los_Angeles"
    }), "2013-09-01T00:00:00.000-07:00")

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

test("tz.IsoString ambigious dates for +30m/-30m DST", function (assert) {
    assert.equal(tz.IsoString({
        iso: "2013-10-05T15:29:59Z",
        timezone: "Australia/Lord_Howe"
    }), "2013-10-06T01:59:59.000+10:30")
    assert.equal(tz.IsoString({
        iso: "2013-10-05T15:30:00Z",
        timezone: "Australia/Lord_Howe"
    }), "2013-10-06T02:30:00.000+11:00")
    assert.equal(tz.IsoString({
        iso: "2013-10-05T15:31:00Z",
        timezone: "Australia/Lord_Howe"
    }), "2013-10-06T02:31:00.000+11:00")

    assert.equal(tz.IsoString({
        iso: "2013-04-06T14:31:00Z",
        timezone: "Australia/Lord_Howe"
    }), "2013-04-07T01:31:00.000+11:00")
    assert.equal(tz.IsoString({
        iso: "2013-04-06T14:59:59Z",
        timezone: "Australia/Lord_Howe"
    }), "2013-04-07T01:59:59.000+11:00")
    assert.equal(tz.IsoString({
        iso: "2013-04-06T15:00:00Z",
        timezone: "Australia/Lord_Howe"
    }), "2013-04-07T01:30:00.000+10:30")
    assert.equal(tz.IsoString({
        iso: "2013-04-06T15:01:00Z",
        timezone: "Australia/Lord_Howe"
    }),"2013-04-07T01:31:00.000+10:30")

    assert.equal(tz.IsoString({
        iso: "2013-04-07T01:20:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-04-07T01:20:00.000+11:00")
    assert.equal(tz.IsoString({
        iso: "2013-04-07T02:00:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-04-07T02:00:00.000+10:30")
    assert.equal(tz.IsoString({
        iso: "2013-04-07T02:20:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-04-07T02:20:00.000+10:30")

    // ambigious
    assert.equal(tz.IsoString({
        iso: "2013-04-07T01:30:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-04-07T01:30:00.000+11:00")
    assert.equal(tz.IsoString({
        iso: "2013-04-07T01:45:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-04-07T01:45:00.000+11:00")

    assert.equal(tz.IsoString({
        iso: "2013-10-06T01:30:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-10-06T01:30:00.000+10:30")
    assert.equal(tz.IsoString({
        iso: "2013-10-06T01:59:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-10-06T01:59:00.000+10:30")
    assert.equal(tz.IsoString({
        iso: "2013-10-06T02:30:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-10-06T02:30:00.000+11:00")
    assert.equal(tz.IsoString({
        iso: "2013-10-06T03:00:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-10-06T03:00:00.000+11:00")

    // ambigious
    assert.equal(tz.IsoString({
        iso: "2013-10-06T02:00:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-10-06T02:30:00.000+11:00")
    assert.equal(tz.IsoString({
        iso: "2013-10-06T02:15:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-10-06T02:45:00.000+11:00")

    assert.end()
})

// function printLine(word,end) {
//     console.log("--------------------------" +
//         word + (end ? " END--" : " START") +
//         "-------------------")
// }
