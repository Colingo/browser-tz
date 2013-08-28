var test = require("tape")

if (!Function.prototype.bind) {
    Function.prototype.bind = function (context) {
        var args = [].slice.call(arguments, 1)
        var fn = this

        return function () {
            return fn.apply(null, args.concat([].slice.call(arguments)))
        }
    }
}

var BrowserTimezone = require("../index")
var tz = require("./tz.js")

test("BrowserTimezone is a function", function (assert) {
    assert.equal(typeof BrowserTimezone, "function")
    assert.end()
})

test("tz has correct methods", function (assert) {
    assert.equal(typeof tz.IsoString, "function")
    assert.equal(typeof tz.addWeek, "function")
    assert.equal(typeof tz.format, "function")

    assert.end()
})

require("./time.js")
require("./add.js")
require("./format.js")
