const Command = require("../models/Command");
const helpers = require("../services/helperFunctions");
const cumberbatch = require("cumberbatch-name");

const benedict = new Command(
    "!benedict",
    "Gives a random Benedict Cumberbatch name",
    function (message) {
        try {
            var ben = cumberbatch();
        } catch (err) {
            console.log(err);
        }
        var commandResponse = ben;
        helpers.commandResponse(message, this, commandResponse);
    }
);

const shitPost = new Command(
    "!shitPost",
    "Generates beautiful text",
    function (message) {
        var string = message.content.split(" ");
        var commandResponse = helpers.generateShitPost(string);
        helpers.commandResponse(message, this, commandResponse);
    }
);

module.exports = {
    benedict: benedict,
    shitPost: shitPost,
};
