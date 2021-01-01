const Command = require("../models/Command");
const rollService = require("../services/rollService");
const calculator = require("../services/calc");
const helpers = require("../services/helperFunctions");

const roll = new Command(
    "!roll",
    "Roll a random number between 1 and 100 or roll nDk dice",
    function (message, args) {
        let commandResponse = rollService.roll(
            args[0],
            message.author.username
        );
        helpers.commandResponse(message, this, commandResponse);
    }
);

const calc = new Command(
    "!calc",
    "Calculator function, also used for math with dices. !calc <operation> | !calc 1d20+10",
    function (message, args) {
        let commandResponse = args[0] + " = " + calculator.interpreter(args[0]);
        helpers.commandResponse(message, this, commandResponse);
    }
);

module.exports = {
    roll: roll,
    calc: calc,
};
