var assert = require("assert");
const converter = require("../services/convert");

describe("dec2Bin", function () {
    describe("convert normal int", function () {
        it("should return expected value", function () {
            assert.strictEqual(converter.dec2Bin(4), "100");
            assert.strictEqual(converter.dec2Bin("4"), "100");
        });
    });
});

describe("dec2Bin", function () {
    describe("with input not numerical", function () {
        it("should return error", function () {
            assert.strictEqual(
                converter.dec2Bin("asdad"),
                "Given argument is not a numerical."
            );
            assert.strictEqual(
                converter.dec2Bin("123123asdadasdasd567"),
                "Given argument is not a numerical."
            );
        });
    });
});

describe("bin2Dec", function () {
    describe("with normal input", function () {
        it("should return expected value", function () {
            assert.strictEqual(converter.bin2Dec("100"), 4);
            assert.strictEqual(converter.bin2Dec("1111"), 15);
            assert.strictEqual(converter.bin2Dec("111001101110"), 3694);
        });
    });
});

describe("bin2Dec", function () {
    describe("with bad input", function () {
        it("should return error", function () {
            assert.strictEqual(
                converter.bin2Dec("asdasd"),
                "ERROR: Argument is not binary"
            );
            assert.strictEqual(
                converter.bin2Dec("5465465410101"),
                "ERROR: Argument is not binary"
            );
            assert.strictEqual(
                converter.bin2Dec("asdasd1110101110a10asd54"),
                "ERROR: Argument is not binary"
            );
            assert.strictEqual(
                converter.bin2Dec("1100011100010asdasdads54545asdasd101100"),
                "ERROR: Argument is not binary"
            );
        });
    });
});
