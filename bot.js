const Discord = require('discord.js');
const music = require('discord.js-music-v11');
const Bot = new Discord.Client();
const auth = require('./auth.json');
const token = auth.token;
var winnerOfTheDay;
var generalChannel;

var fs = require("fs");
var contents  = fs.readFileSync("userHash.json");
userHash = JSON.parse(contents);

music(Bot);
Bot.login(token);

Bot.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
    winnerOfTheDay = Bot.users.random().username
    givepoint(winnerOfTheDay);
    //for some reasons the bot wont get channeId in global variables
    var channel = Bot.channels.get("353747084819693571");
    generalChannel=channel;
});

function saveUserPoints(){
	var json = JSON.stringify(userHash);
	fs.writeFile('userHash.json', json, 'utf8');
}

//change the winner of the day 
function changeWinner(){
	winnerOfTheDay = Bot.users.random().username
	givepoint(winnerOfTheDay);
}

//bot will join general voice chat
function joinGeneralChannel(){
	generalChannel.join()
  	.then(connection => console.log('Connected'))
  	.catch(console.error);
}

//bot will leave general voice chat
function leaveGeneralChannel(){
	generalChannel.leave();
  	console.log('Disconnected');
}

function givepoint(key){
	userHash[key]=userHash[key]+=1;
}


//chat commands
let prefix = "!";
Bot.on("message", (message) => {
	
  if (message.author.id === Bot.user.id || message.author.bot) return;
  let args = message.content.split(" ").slice(1);

  //winner of the day
  if (message.content.startsWith(prefix + "winner")) {
    message.channel.send("The Winner of the day is "+ winnerOfTheDay + "! Gratz!!");
  }
  if (message.content.startsWith(prefix + "changewinner")) {
  	changeWinner();
    message.channel.send("The Winner of the day is now "+ winnerOfTheDay);
  }

  //mick
  if (message.content.startsWith(prefix + "mick")) {   
    if(message.author.username=="Kraken"){
  		message.channel.send("Je suis" + message.author +", et j'aime mon playstation!");
  	}else{
  		message.channel.send("Mick ye poche y joue a Destiny 2 sur console... lol");
  	}
  }

  //roll
  if (message.content.startsWith(prefix + "roll")) {
    message.channel.send(message.author.username+" has rolled "+(Math.floor(Math.random() * 100) + 1)  +"!");
  }

  //chipchocolate
  if (message.content.startsWith(prefix + "chipchocolate")) {
  	if(message.author.username=="chipchocolate"){
  		message.channel.send("Je suis" + message.author +", un dieu de pubg!");
  	}else{
  		message.channel.send("chipchocolate, plz carry nous a pubg!");
  	}    
  }
  //join//leave general Channel
  if(message.content.startsWith(prefix + "joinGeneral")) {  
  	joinGeneralChannel();
  }
  if(message.content.startsWith(prefix + "leaveGeneral")) {  
  	leaveGeneralChannel();
  }

  //point system
  if(message.content.startsWith(prefix + "points")) { 
  	var key =  message.author.username;
  	if(!userHash[key]){
  		message.channel.send(message.author+" has 0 points. RIP");
  	}else{
  		message.channel.send(message.author+" has "+userHash[key]+" points.");
  	}  	
  }

  if(message.content.startsWith(prefix + "gimmepoint")) {  
  	var key =  message.author.username;
  	givepoint(key);
  	message.channel.send(message.author+" has now "+userHash[key]+" points.");
  }
  if(message.content.startsWith(prefix + "savepoints")){
  	saveUserPoints();
  }
  if(message.content.startsWith(prefix + "allpoints")){ 	
  		message.channel.send(JSON.stringify(userHash));  	 	
  }

});




        

