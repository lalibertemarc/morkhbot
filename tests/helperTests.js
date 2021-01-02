var assert = require("assert");
const helpers = require("../services/helperFunctions");

describe("getCommand", function () {
    describe("given good input", function () {
        it("should give expected value", function () {
            assert.strictEqual(helpers.getCommand("!command test"), "command");
            assert.strictEqual(helpers.getCommand("!asd1123"), "asd1123");
            assert.strictEqual(helpers.getCommand("123"), "23");
        });
    });
});

describe("getArgs", function () {
    describe("given good input", function () {
        it("should give expected value", function () {
            assert.deepStrictEqual(helpers.getArgs("!command test"), ["test"]);
            assert.deepStrictEqual(helpers.getArgs("!command"), []);
            assert.deepStrictEqual(helpers.getArgs("!command 1 2 3"), ["1", "2", "3"]);
        });
    });
});

describe("isNumber", function () {
    describe("given number input", function () {
        it("should give expected value", function () {
            assert.strictEqual(helpers.isNumber(5), true);
            assert.strictEqual(helpers.isNumber("5"), true);
            assert.strictEqual(helpers.isNumber(532424), true);
            assert.strictEqual(helpers.isNumber(-532424), true);
        });
    });
});

describe("isNumber", function () {
    describe("given bad input", function () {
        it("should give expected value", function () {
            assert.strictEqual(helpers.isNumber(NaN), false);
            assert.strictEqual(helpers.isNumber("5asdasd"), false);
            assert.strictEqual(helpers.isNumber(""), false);
            assert.strictEqual(helpers.isNumber(" "), false);
            assert.strictEqual(helpers.isNumber(null), false);
        });
    });
});
