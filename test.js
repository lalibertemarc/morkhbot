var fs = require("fs");

const Discord = require('discord.js');
const Bot = new Discord.Client();
var testChannel  = require('./bot.js')

function send(){
	testChannel.send("hello")
}

module.exports={
	send:send
}