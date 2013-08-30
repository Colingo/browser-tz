var test = require("tape")

var tz = require("./tz.js")

test("single test", function (assert) {
    console.log("----------------------- Australia/Lord_Howe -----------------")
    assert.equal(tz.IsoString({
        iso: "2013-10-06T02:00:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-10-06T02:30:00.000+11:00")
    console.log("----------------------- America/Toronto ---------------------")
    assert.equal(tz.IsoString({
        iso: "2013-03-10T02:00:00",
        timezone: "America/Toronto"
    }), "2013-03-10T03:00:00.000-04:00")

    assert.equal(tz.IsoString({
        iso: "2013-04-07T02:00:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-04-07T02:00:00.000+10:30")
    assert.equal(tz.IsoString({
        iso: "2013-04-07T01:20:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-04-07T01:20:00.000+11:00")
    assert.equal(tz.IsoString({
        iso: "2013-10-06T03:00:00",
        timezone: "Australia/Lord_Howe"
    }), "2013-10-06T03:00:00.000+11:00")


    assert.equal(tz.addSecond({
        iso: "2013-10-05T15:30:00Z",
        timezone: "Australia/Lord_Howe"
    }, -30), "2013-04-07T01:59:30.000+11:00")
    // console.log("correct time", tz.IsoString({
    //     iso: "2013-03-10T02:00:00:00.000",
    //     timezone: "America/Toronto"
    // }))

    assert.end()
})
