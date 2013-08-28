var test = require("tape")

var tz = require("./tz.js")

test("format", function (assert) {
    assert.equal(tz.format("2013-08-10T18:00:00", "hh:mm"), "06:00")

    assert.end()
})
