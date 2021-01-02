var assert = require("assert");
const primeService = require("../services/prime");

describe("isNumberPrime", function () {
    describe("with normal int as input", function () {
        it("should return expected value", function () {
            assert.strictEqual(primeService.isNumberPrime(4), false);
            assert.strictEqual(primeService.isNumberPrime(3), true);
            assert.strictEqual(primeService.isNumberPrime(2), true);
            assert.strictEqual(primeService.isNumberPrime(13), true);
        });
    });
});

describe("isPrime", function () {
    describe("with normal int as input", function () {
        it("should return expected value", function () {
            assert.strictEqual(primeService.isPrime(4), "4 is not prime.");
            assert.strictEqual(primeService.isPrime(6), "6 is not prime.");
            assert.strictEqual(primeService.isPrime(13), "13 is prime.");
        });
    });
});

describe("isPrime", function () {
    describe("with bad input", function () {
        it("should return error", function () {
            assert.strictEqual(primeService.isPrime("asdasd"), "asdasd is not a number.");
            assert.strictEqual(primeService.isPrime("asdasd123123"), "asdasd123123 is not a number.");
            assert.strictEqual(primeService.isPrime("123123asdasd123123"), "123123asdasd123123 is not a number.");
        });
    });
});

describe("gcd", function () {
    describe("with good input", function () {
        it("should return expected value", function () {
            assert.strictEqual(primeService.gcd(4, 2), 2);
            assert.strictEqual(primeService.gcd(3, 6), 3);
            assert.strictEqual(primeService.gcd(13, 7), 1);
            assert.strictEqual(primeService.gcd(5, 105), 5);
            assert.strictEqual(primeService.gcd("5", "105"), 5);
            assert.strictEqual(primeService.gcd(4, "5"), 1);
            assert.strictEqual(primeService.gcd(4, "4"), 4);
        });
    });
});

describe("gcd", function () {
    describe("with bad input", function () {
        it("should return error", function () {
            assert.strictEqual(primeService.gcd(4, "asd"), "Please enter integers.");
            assert.strictEqual(primeService.gcd("asd", 4), "Please enter integers.");
            assert.strictEqual(primeService.gcd("asd", "asd"), "Please enter integers.");
            assert.strictEqual(primeService.gcd(4, ""), "Please enter integers.");
            assert.strictEqual(primeService.gcd(4, " "), "Please enter integers.");
            assert.strictEqual(primeService.gcd("", 4), "Please enter integers.");
            assert.strictEqual(primeService.gcd(" ", 4), "Please enter integers.");
        });
    });
});

describe("nPrime", function () {
    describe("given good input", function () {
        it("should return expected value", function () {
            assert.deepStrictEqual(primeService.nPrime(3), [1, 2, 3]);
            assert.deepStrictEqual(primeService.nPrime("3"), [1, 2, 3]);
            assert.deepStrictEqual(primeService.nPrime(5), [1, 2, 3, 5, 7]);
            assert.deepStrictEqual(primeService.nPrime(7), [1, 2, 3, 5, 7, 11, 13]);
        });
    });
});

describe("nPrime", function () {
    describe("given bad input", function () {
        it("should return error", function () {
            assert.deepStrictEqual(primeService.nPrime(""), "Please enter integers.");
            assert.deepStrictEqual(primeService.nPrime(" "), "Please enter integers.");
            assert.deepStrictEqual(primeService.nPrime("asdasd"), "Please enter integers.");
            assert.deepStrictEqual(primeService.nPrime("123123asdasd"), "Please enter integers.");
        });
    });
});

describe("primeRange", function () {
    describe("given good input", function () {
        it("should return expected value", function () {
            assert.deepStrictEqual(primeService.primeRange(3, 5), [3, 5]);
            assert.deepStrictEqual(primeService.primeRange(2, 20), [2, 3, 5, 7, 11, 13, 17, 19]);
            assert.deepStrictEqual(primeService.primeRange(3, 9), [3, 5, 7]);
            assert.deepStrictEqual(primeService.primeRange(9, 3), [3, 5, 7]);
            assert.deepStrictEqual(primeService.primeRange(3, "9"), [3, 5, 7]);
            assert.deepStrictEqual(primeService.primeRange("3", 9), [3, 5, 7]);
            assert.deepStrictEqual(primeService.primeRange("3", "9"), [3, 5, 7]);
        });
    });
});

describe("primeRange", function () {
    describe("given bad input", function () {
        it("should return error", function () {
            assert.deepStrictEqual(primeService.primeRange(3, ""), "Please enter integers.");
            assert.deepStrictEqual(primeService.primeRange(3, " "), "Please enter integers.");
            assert.deepStrictEqual(primeService.primeRange("", 3), "Please enter integers.");
            assert.deepStrictEqual(primeService.primeRange(" ", 3), "Please enter integers.");
            assert.deepStrictEqual(primeService.primeRange("", ""), "Please enter integers.");
            assert.deepStrictEqual(primeService.primeRange(3, "asdasdacac"), "Please enter integers.");
        });
    });
});
