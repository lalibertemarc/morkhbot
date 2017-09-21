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
    if(winnerOfTheDay=="Clyde" || winnerOfTheDay=="Morkh's Bot"){
    	changeWinner();
    }
    //for some reasons the bot wont get channeId in global variables
    var channel = Bot.channels.get("353747084819693571");
    generalChannel=channel;
});



//change the winner of the day 
function changeWinner(){
	while(winnerOfTheDay=="Clyde" || winnerOfTheDay=="Morkh's Bot" ){
		winnerOfTheDay = Bot.users.random().username
		givepoint(winnerOfTheDay);
	}	
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


//give +1 points to message author
function givepoint(key){
	//new user will be put in userHash
	if(userHash[key]==null || userHash[key]==undefined ){
		userHash[key]=0;
		console.log(userHash);
		saveUserPoints();
		return
	}
	userHash[key]=userHash[key]+=1;
	console.log(userHash);
	saveUserPoints();
}

function givepoints(key, points){
	console.log(points)
		//new user will be put in userHash
	if(userHash[key]==null || userHash[key]==undefined ){
		userHash[key]=0;
	}
	userHash[key]=userHash[key]+points;
	console.log(userHash);
	saveUserPoints();
}

//save user points to json file
function saveUserPoints(){
	var json = JSON.stringify(userHash);
	fs.writeFile('userHash.json', json, 'utf8');
	console.log("saved to userHash.json");
}

//reset all points
function resetPoints(){
	for(key in userHash){
		userHash[key]=0;
	}
	saveUserPoints();
}



//chat commands
let prefix = "!";
Bot.on("message", (message) => {
  if (message.author.id === Bot.user.id || message.author.bot) return;
  let args = message.content.split(" ").slice(1);


  //winner of the day
  if (message.content.startsWith(prefix)) {
  	var cmd = message.content;

  	switch (cmd){

  		case "!winner":
	  		message.channel.send("The Winner of the day is "+ winnerOfTheDay + "! Gratz!!");
	  		break;

  		case "!changewinner":
	  		if(message.author.username=="Morkh"){
	  			changeWinner();
	    		message.channel.send("The Winner of the day is now "+ winnerOfTheDay);
	  		}else{
	  			message.channel.send("You don't have the permission to do that");
	  		}
	  		break;

  		//get a point if you make a play command
    	case "!play":
    		givepoint(message.author.username);
    		break;

    	case "!roll":
    		message.channel.send(message.author.username+" has rolled "+(Math.floor(Math.random() * 100) + 1)  +"!");
    		break;

    	case "!joinGeneral":
    		joinGeneralChannel();
    		break;
    	case "!leaveGeneral":
    		leaveGeneralChannel();
    		break;

    	case "!points":
    		var key =  message.author.username;
  			if(userHash[key]==undefined || userHash[key]==null){
  				givepoint(key);
  			}
  			if(!userHash[key]){
  				message.channel.send(message.author+" has 0 points. RIP");
  			}else{
  				message.channel.send(message.author+" has "+userHash[key]+" points.");
  			}
  			break; 	
  		
  		case "!gimmepoint":
  			var key =  message.author.username;
  			givepoint(key);
  			message.channel.send(message.author+" has now "+userHash[key]+" points.");
  			break;

  		case "!give points ":
  			var key =  message.author.username;
  			var points = +message.content.slice(-2); 			
  			givepoints(key,points);
  			message.channel.send(message.author+" has now "+userHash[key]+" points.");
  			break;
  		case "!allpoints":
  			message.channel.send(JSON.stringify(userHash));
  			break;
  		case "!resetpoints":
  			if(message.author.username=="Morkh"){
  				resetPoints();
  				message.channel.send(JSON.stringify(userHash));  
  			}else{
  				message.channel.send("You don't have the permission to do that");
  			} 	  		

	}
}

});




        

