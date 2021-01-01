const Command = require("../models/Command");
const helpers = require("../services/helperFunctions");
const converter = require("../services/convert");

const bin2Dec = new Command(
    "!bin2Dec",
    "Converts binary string into decimal number",
    function (message, args) {
        let commandResponse = converter.bin2Dec(args[0]);
        helpers.commandResponse(message, this, commandResponse);
    }
);

const dec2Bin = new Command(
    "!dec2Bin",
    "Converts a number into a binary string : !dec2Bin <number>",
    function (message, args) {
        let commandResponse = converter.dec2Bin(+args[0]);
        helpers.commandResponse(message, this, commandResponse);
    }
);

module.exports = {
    bin2Dec: bin2Dec,
    dec2Bin: dec2Bin,
};
