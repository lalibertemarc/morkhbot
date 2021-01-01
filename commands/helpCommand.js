const Command = require("../models/Command");
const helpers = require("../services/helperFunctions");

const help = new Command(
    "!help",
    "Get the url to see a list of all commands",
    function (message, args) {
        let commandResponse = `Please visit http://${process.env.HOST}:${process.env.PORT}/views/help to see the available commands`;
        helpers.commandResponse(message, this, commandResponse);
    }
);

module.exports = {
    help: help,
};
