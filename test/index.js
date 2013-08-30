var test = require("tape")

if (!Function.prototype.bind) {
    Function.prototype.bind = require("function-bind")
}

var BrowserTimezone = require("../index")
var tz = require("./tz.js")

test("BrowserTimezone is a function", function (assert) {
    assert.equal(typeof BrowserTimezone, "function")
    assert.end()
})

test("tz has correct methods", function (assert) {
    assert.equal(typeof tz.IsoString, "function")
    assert.equal(typeof tz.format, "function")
    assert.equal(typeof tz.addMillisecond, "function")
    assert.equal(typeof tz.addSecond, "function")
    assert.equal(typeof tz.addMinute, "function")
    assert.equal(typeof tz.addHour, "function")
    assert.equal(typeof tz.addDay, "function")
    assert.equal(typeof tz.addWeek, "function")
    assert.equal(typeof tz.addMonth, "function")
    assert.equal(typeof tz.addYear, "function")

    assert.end()
})

require("./iso-string.js")
require("./add.js")
require("./format.js")
