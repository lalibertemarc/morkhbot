const Command = require("../models/Command");
const helpers = require("../services/helperFunctions");
const name = require("../services/randomName");

const changeName = new Command(
    "!changeName",
    "The bot will give you a random name",
    function (message, args) {
        let newName = name.getRandomName();
        message.member.setNickname(newName).catch(err);
        let commandResponse = `Your new name is ${newName}`;
        helpers.commandResponse(message, this, commandResponse);
    }
);

const randomNames = new Command(
    "!randomNames",
    "Gives a list of random Medieval names",
    function (message, args) {
        let commandResponse = "";
        if (helpers.isNumber(args[0])) {
            for (let i = 0; i < +args[0]; i++) {
                commandResponse += name.getRandomName() + "\n";
            }
        } else commandResponse = "Given argument is not numerical.";

        helpers.commandResponse(message, this, commandResponse);
    }
);

const resetName = new Command(
    "!resetName",
    "The Bot will restore your old name",
    function (message, args) {
        message.member.setNickname("").catch(error);
        var commandResponse = "Name is back to normal";
        helpers.commandResponse(message, this, commandResponse);
    }
);

module.exports = {
    changeName: changeName,
    randomNames: randomNames,
    resetName: resetName,
};
