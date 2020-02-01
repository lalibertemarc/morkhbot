const Discord = require("discord.js");
const apiRoutes = require("./routes/apiRoutes.js");
var path = require("path");
require("dotenv").config();
const Bot = new Discord.Client();

Bot.login(process.env.DISCORDTOKEN);

//const from other modules
const commandList = require("./commandList.js").commandList;
const helpers = require("./services/helperFunctions.js");

//server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json("application/json"));
app.use("/api", apiRoutes);

app.listen(process.env.PORT, () => console.log(`Now listening to ${process.env.PORT}`));

//activate bot
Bot.on("ready", () => console.log(`[Start] ${new Date()}`));

Bot.on("messageReactionAdd", (reaction, user) => {
    reaction.message.channel.send(`${user} reacted to ${reaction.message.author}  with  ${reaction._emoji.name}`);
});

//chat commands
let prefix = "!";
Bot.on("message", message => {
    if (message.author.id === Bot.user.id || message.author.bot) return;
    if (message.content.startsWith(prefix)) {
        let command = helpers.getCommand(message.content);
        if (command in commandList) {
            commandList[command].handler(message, helpers.getArgs(message.content));
        } else
            message.channel.send(
                helpers.botResponse("Invalid Command", `Please visit http://${process.env.HOST}:${process.env.PORT}/api/help to see the available commands`, "")
            );
    }
});

module.exports = {
    Bot: Bot
};
