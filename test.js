var fs = require("fs");
var bot  = require('./bot.js');
var testChannel;

function send(){
	testChannel=bot.testChannel;
	testChannel.send("hello")
}

module.exports={
	send:send
}
