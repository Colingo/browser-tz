var test = require("tape")

var tz = require("./tz.js")

test("single test", function (assert) {
    assert.equal(tz.addWeek({
        iso: "2013-10-20T06:00:00.000Z",
        timezone: "America/Toronto"
    }, 2), "2013-11-03T02:00:00.000-05:00")
    // console.log("correct time", tz.IsoString({
    //     iso: "2013-03-10T02:00:00:00.000",
    //     timezone: "America/Toronto"
    // }))

    assert.end()
})
