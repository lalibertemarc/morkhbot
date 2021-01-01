const Command = require("../models/Command");
const helpers = require("../services/helperFunctions");
const duel = require("../services/duel");

const challengeDuel = new Command(
    "!challengeDuel",
    "Challenge a user in a game of dice",
    function (message, args) {
        var initiator = message.author.username;
        var target = args[1];
        var commandResponse = duel.initiateDuel(initiator, target);
        helpers.commandResponse(message, this, commandResponse);
    }
);

const acceptDuel = new Command(
    "!acceptDuel",
    "Accepts the duel your opponent sent you",
    function (message, args) {
        var commandResponse = duel.acceptDuel(message.author.username);
        helpers.commandResponse(message, this, commandResponse);
    }
);

const duelRoll = new Command(
    "!duelRoll",
    "Roll a dice when its your turn in the duel. !duelRoll nDk",
    function (message, args) {
        var commandResponse = duel.duelRoll(message.author.username, args[1]);
        helpers.commandResponse(message, this, commandResponse);
    }
);

const endDuel = new Command(
    "!endDuel",
    "Ends the duel",
    function (message, args) {
        var commandResponse = duel.endDuel();
        helpers.commandResponse(message, this, commandResponse);
    }
);

const clearDuel = new Command(
    "!clearDuel",
    "Clears the duel data in case something goes wrong",
    function (message, args) {
        var commandResponse = duel.clearDuelData();
        helpers.commandResponse(message, this, commandResponse);
    }
);

const refuseDuel = new Command(
    "!refuseDuel",
    "Refuse the duel your opponent just sent you",
    function (message, args) {
        var commandResponse = duel.refuseDuel();
        helpers.commandResponse(message, this, commandResponse);
    }
);

module.exports = {
    challengeDuel: challengeDuel,
    acceptDuel: acceptDuel,
    duelRoll: duelRoll,
    endDuel: endDuel,
    clearDuel: clearDuel,
    refuseDuel: refuseDuel,
};
