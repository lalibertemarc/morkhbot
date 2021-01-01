const Command = require("../models/Command");
const helpers = require("../services/helperFunctions");
const pointsService = require("../services/pointsService");

const addMe = new Command(
    "!addMe",
    "Add your username in the database for the point system",
    async function (message, args) {
        let user = message.author.username;
        let commandResponse = await pointsService.addUser(user, 0);
        helpers.commandResponse(message, this, commandResponse);
    }
);

const myPoints = new Command(
    "!myPoints",
    "Check how many points you have.",
    async function (message, args) {
        let user = message.author.username;
        let commandResponse = await pointsService.getPointsForUser(user);
        helpers.commandResponse(message, this, commandResponse);
    }
);

const allPoints = new Command(
    "!allPoints",
    "Check the points for every users in the database",
    async function (message, args) {
        let commandResponse = await pointsService.getPointsForAllUsers();
        helpers.commandResponse(message, this, commandResponse);
    }
);

const give = new Command(
    "!give",
    "Give that user some points : !give <user> <points>",
    async function (message, args) {
        let user = args[0];
        let points = +args[1];
        let commandResponse = "";
        if (args.length != 2 || !helpers.isNumber(args[1]))
            commandResponse = "Invalid format for command.";
        else {
            commandResponse = await pointsService.giveUserSomePoint(
                user,
                points
            );
        }
        helpers.commandResponse(message, this, commandResponse);
    }
);

module.exports = {
    addMe: addMe,
    myPoints: myPoints,
    allPoints: allPoints,
    give: give,
};
