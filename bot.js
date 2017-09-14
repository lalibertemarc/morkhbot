const Discord = require('discord.js');
const music = require('discord.js-music-v11');
const Bot = new Discord.Client();
var auth = require('./auth.json');
const token = auth.token
 
Bot.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
});
 
music(Bot);
Bot.login(token);



let prefix = "!";
Bot.on("message", (message) => {
  if (message.author.id === Bot.user.id || message.author.bot) return;
  let args = message.content.split(" ").slice(1);
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("pong!");
  }
  if (message.content.startsWith(prefix + "mick")) {
    message.channel.send("Mick ye poche y joue a Destiny 2 sur console... lol");
  }
  if (message.content.startsWith(prefix + "roll")) {
    message.channel.send(message.author.username+" has rolled "+(Math.floor(Math.random() * 100) + 1)  +"!");
  }

});
