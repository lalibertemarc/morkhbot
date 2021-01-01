const Command = require("../models/Command.js");
const helpers = require("../services/helperFunctions.js");
const webResquestHelper = require("../services/webRequesterHelper.js");

const addMe = new Command(
    "!addMe",
    "Add your username in the database for the point system",
    async function (message, args) {
        let user = message.author.username;
        let commandResponse = await addUser(user, 0);
        helpers.commandResponse(message, this, commandResponse);
    }
);

const myPoints = new Command(
    "!myPoints",
    "Check how many points you have.",
    async function (message, args) {
        let commandResponse = "";
        try {
            let user = message.author.username;
            let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.READ_API}/points?name=${user}`;
            let response = await webResquestHelper.getAsync(url);
            if (response.status == 200) {
                let currentPoints = response.data[0].points;
                commandResponse = `${user} has ${
                    currentPoints > 1
                        ? currentPoints + " points"
                        : currentPoints + " point"
                } .`;
            } else if (response.status == 402) {
                commandResponse = await addUser(user, 0);
            }
        } catch (error) {
            console.log(error);
            commandResponse = "Unexpected Error in my points, please retry";
        }
        helpers.commandResponse(message, this, commandResponse);
    }
);

const allPoints = new Command(
    "!allPoints",
    "Check the points for every users in the database",
    async function (message, args) {
        let commandResponse = "";
        try {
            let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.READ_API}/points?`;

            let response = await webResquestHelper.getAsync(url);
            if (response.status == 200)
                commandResponse = helpers.parsePoints(response.data);
            else commandResponse = response.data.message;
        } catch (error) {
            commandResponse = "Unexpected Error, please retry";
        }
        helpers.commandResponse(message, this, commandResponse);
    }
);

const give = new Command(
    "!give",
    "Give that user some points : !give <user> <points>",
    async function (message, args) {
        let commandResponse = "";

        if (args.length != 2 || !helpers.isNumber(args[1]))
            commandResponse = "Invalid format for command.";
        else {
            let user = args[0];
            let points = +args[1];

            try {
                let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.WRITE_API}/points`;

                let response = await webResquestHelper.patchAsync(url, {
                    name: user,
                    points: points,
                });
                if (response.status == 200) {
                    commandResponse = response.data;
                } else if (response.status == 402)
                    commandResponse = await addUser(user, points);
            } catch (error) {
                console.log(error);
                commandResponse = "Unexpected Error, please retry";
            }
        }

        helpers.commandResponse(message, this, commandResponse);
    }
);

async function addUser(userName, points) {
    try {
        let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.WRITE_API}/points`;
        let response = await webResquestHelper.putAsync(url, {
            name: userName,
            points: points,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

module.exports = {
    addMe: addMe,
    myPoints: myPoints,
    allPoints: allPoints,
    give: give,
};
