const Discord = require("discord.js");
const Bot = new Discord.Client();
const auth = require("./auth.json");
const token = auth.token;
Bot.login(token);

//const from other modules
const commands = require("./commandList.js");
var commandList = commands.commandList;
const helpers = require("./helperFunctions.js");

//server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json("application/json"));

//to send message without using message object
var NotifyChannel;

//activate bot
Bot.on("ready", () => {
    console.log(`[Start] ${new Date()}`);
    //init variables for channels
    NotifyChannel = Bot.channels.get("353747084819693570");
});

//fortnite webhook
app.post("/webhook", function(req, res) {
    NotifyChannel.send(req.body.user_name + " has pushed a new commit for " + req.body.project.name + ".");
    NotifyChannel.send(req.body.commits[0].message);
    NotifyChannel.send("Check it out at http://108.61.78.227:8888/");
    res.send({ message: "we received webhook" });
});

app.get("/api/send/:channelId/:message", (req, res) => {
    let channelId = req.params.channelId;
    let message = req.params.message;
    let channel = Bot.channels.find("id", channelId);
    channel.send(helpers.botResponse("MorkhBot is saying : ", message, "This is blood magic!"));
    res.send(`${message} was transmitted to the ${channel.name} channel`);
});

app.listen(8000, () => console.log("Now listening to 8000"));

Bot.on("messageReactionAdd", (reaction, user) => {
    reaction.message.channel.send(`${user} reacted to ${reaction.message.author}  with  ${reaction._emoji.name}`);
});

//chat commands
let prefix = "!";
Bot.on("message", message => {
    if (message.author.id === Bot.user.id || message.author.bot) return;
    if (message.content.startsWith(prefix)) {
        var array = message.content.split(" ");
        if (array.length == 1) array = message.content.split("/");
        var command = array[0].substring(1, array[0].length);

        if (command in commandList) {
            commandList[command].handler(message);
        } else message.channel.send(helpers.botResponse("Invalid Command", "Please use the !help command", ""));
    }
});
