const Command = require("../models/Command");
const helpers = require("../services/helperFunctions");
const primeService = require("../services/prime");

const isPrime = new Command(
    "!isPrime",
    "Is the given number a prime number? !isPrime <number>",
    function (message, args) {
        let commandResponse = primeService.isPrime(args[0]);
        helpers.commandResponse(message, this, commandResponse);
    }
);

const nPrime = new Command(
    "!nPrime",
    "Gives all the n first prime numbers. !nPrime <n>",
    function (message, args) {
        let commandResponse = "";
        if (helpers.isNumber(args[0]))
            commandResponse = primeService.nPrime(+args[0]);
        else commandResponse = "Given argument is not a numerical.";
        helpers.commandResponse(message, this, commandResponse);
    }
);

const gcd = new Command(
    "!gcd",
    "Gives the greater common diviser between the 2 given arguments. !gcd <number> <number>",
    function (message, args) {
        let commandResponse = primeService.gcd(+args[0], +args[1]);
        helpers.commandResponse(message, this, commandResponse);
    }
);

const primeRange = new Command(
    "!primeRange",
    "Gives all the prime numbers in the given argument range. !primeRange <lower> <upper>",
    function (message, args) {
        var commandResponse = "";
        if (helpers.isNumber(args[0]) || helpers.isNumber(args[1]))
            commandResponse = primeService.primeRange(+args[0], +args[1]);
        else commandResponse = "One of the given arguments is not a numerical.";
        helpers.commandResponse(message, this, commandResponse);
    }
);

module.exports = {
    isPrime: isPrime,
    nPrime: nPrime,
    gcd: gcd,
    primeRange: primeRange,
};
