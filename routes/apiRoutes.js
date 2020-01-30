const express = require("express");
const router = express.Router();
const Bot = require("./../bot.js").Bot;
const commandList = require("./../commandList.js").commandList;
const helpers = require("./../services/helperFunctions.js");

router.get("/send/:channelId/:message", (req, res) => {
    let channelId = req.params.channelId;
    let message = req.params.message;
    let channel = Bot.channels.find("id", channelId);
    channel.send(helpers.botResponse("Morkh Bot is saying : ", message, "This is blood magic!"));
    res.send(`${message} was transmitted to the ${channel.name} channel`);
});

router.get("/help", (req, res, next) => {
    var commandResponse = [];

    for (var key in commandList) {
        var command = commandList[key];
        commandResponse.push(`${command.name}   : ${command.description}`);
    }
    res.render("help", {
        title: "Morkhbot",
        list: commandResponse
    });
});
module.exports = router;
