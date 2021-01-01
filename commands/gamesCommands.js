const Command = require("../models/Command");
const helpers = require("../services/helperFunctions");
const webResquestHelper = require("../services/webRequesterHelper");

var allGames = new Command(
    "!allGames",
    "Get all available games to roll when you dont know what to play",
    async function (message, args) {
        let commandResponse = "";
        try {
            let response = await getGames();
            if (response.status == 200)
                commandResponse = helpers.parseGames(response.data);
            else commandResponse = "Unexpected Error, please retry";
        } catch (error) {
            commandResponse = "Unexpected Error, please retry";
        }
        helpers.commandResponse(message, this, commandResponse);
    }
);

var rollGames = new Command(
    "!rollGames",
    "Roll a random game to play if you have no inspiration on what to play",
    async function (message, args) {
        let commandResponse = "";
        try {
            let response = await getGames();
            if (response.status == 200)
                commandResponse = helpers.getRandomfromArray(response.data)
                    .name;
            else commandResponse = "Unexpected Error, please retry";
        } catch (error) {
            commandResponse = "Unexpected Error, please retry";
        }
        helpers.commandResponse(message, this, commandResponse);
    }
);

var addGame = new Command(
    "!addGame",
    "Add a game in the database to get a chance to roll it",
    async function (message, args) {
        let commandResponse = "";
        try {
            let newGame = helpers.parseArgs(args);
            let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.WRITE_API}/games`;
            let response = await webResquestHelper.putAsync(url, {
                name: newGame,
            });
            commandResponse = response.data;
        } catch (error) {
            commandResponse = "Unexpected Error, please retry";
        }
        helpers.commandResponse(message, this, commandResponse);
    }
);

async function getGames() {
    let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.READ_API}/games`;
    return await webResquestHelper.getAsync(url);
}

module.exports = {
    allGames: allGames,
    rollGames: rollGames,
    addGame: addGame,
};
