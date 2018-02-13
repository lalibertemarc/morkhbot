const Discord = require('discord.js');
const Bot = new Discord.Client();
const auth = require('./auth.json');
const token = auth.token;

//const from other modules
const music = require('discord.js-music-v11');
const calc = require('./calc.js');
const launcher = require('./dicelauncher.js');
const duel = require('./duel.js');
const pts = require('./points.js');
const prime = require('./prime.js')


 // web crawler related
var Crawler = require("node-webcrawler");
var url = require('url');

//to join or disconnect the bot from channel
var generalChannel;

//to send message without using message object
var NotifyChannel;

//var from other modules
var userHash;
var help;

var fs = require("fs");
var helpcontent = fs.readFileSync("help.json");
help = JSON.parse(helpcontent);

music(Bot);

Bot.login(token);

//key press var and begin process
var keypress = require('keypress'); 
keypress(process.stdin);

//activate bot
Bot.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
    userHash = pts.userHash;
    initUsers();
    //init variables for channels
    var channel = Bot.channels.find("id", "353747084819693570");
    NotifyChannel=channel;

    var channel2 = Bot.channels.get("353747084819693571");
    generalChannel=channel2;
    Bot.user.setGame("Node.js")

});



//iterate overs users to initate them in userhash
function initUsers(){
	for(user of Bot.users){		
		points = userHash[user[1].username]
		if (points==null || points==undefined){
			userHash[user[1].username]=0
		}
	}
	pts.userHash=userHash
	pts.saveUserPoints();
	console.log(userHash);	
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


//R6 web crawler
var r6 = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
    callback : function (error, result, $) {
        
        if(error){
            console.log(error);
        }else{
            value = $( "div.value" ).text().split("\n");
            console.log(value[5])
            NotifyChannel.send("You have a Kill/Death ratio of " + value[5]) ;
        }
    }
});

//launch R6 web crawler
function launchR6Crawler(author){
	switch (author){
		case "Morkh":
			r6.queue('https://r6stats.com/stats/uplay/morkh1436');
			break;
		case "chipchocolate":
			r6.queue('https://r6stats.com/stats/uplay/chipchocolate7');
			break;
		default:
			"Your username is not initialized in the bot code, ask your Discord server admin.";
			break;
	}
}


//chat commands
let prefix = "!";
Bot.on("message", (message) => {
  if (message.author.id === Bot.user.id || message.author.bot) return;
  let args = message.content.split(" ").slice(1);

  //huge switch case, seems to be faster than if then else
  if (message.content.startsWith(prefix)) {
  	var cmd = message.content;

  	switch (cmd){	
    	case "!roll":
    		message.channel.send(message.author.username+" has rolled "+(Math.floor(Math.random() * 100) + 1)  +"!");
    		break;
    	//bot will leave or join general channel	
    	case "!joinGeneral":!
    		joinGeneralChannel();
    		break;
    	case "!leaveGeneral":
    		leaveGeneralChannel();
    		break;
    	case "!leaveCurrent": 
  			joinGeneralChannel();
  			leaveGeneralChannel();
  			break;

    	//point system commands
    	case "!points":
    		var key =  message.author.username;
  			if(userHash[key]==undefined || userHash[key]==null){
  				pts.givepoint(key);
  			}
  			if(!userHash[key]){
  				message.channel.send(message.author+" has 0 points. RIP");
  			}else{
  				message.channel.send(message.author+" has "+userHash[key]+" points.");
  			}
  			break; 	
  		
  		case "!gimmePoint":
  			var key =  message.author.username;
  			pts.givepoint(key);
  			message.channel.send(message.author+" has now "+userHash[key]+" points.");
  			break;

  		case "!allPoints":
  			message.channel.send(JSON.stringify(userHash));
  			break;
  		case "!resetPoints":
  			if(message.author.username=="Morkh"){
  				pts.resetPoints();
  				message.channel.send(userHash);  
  			}else{
  				message.channel.send("You don't have the permission to do that");
  			}
  		case "!help":
  			message.channel.send(help);
  			break;
 
  		case "!getR6Kd":
  				launchR6Crawler(message.author.username)
  				break; 		

  		//to call different functions, more complicated
  		default :
	  			//user will give specified user points !give username 10
	  		if(message.content.startsWith(prefix+"give ")){
	  			console.log(key)
	  			var string = message.content.split(" ");
	  			if(string.length>3){
	  				message.channel.send("Invalid command");
	  				return;
	  			} 
	  			var key = string[1];
	  			var points = +string[string.length-1]; 
	  			if(userHash[key]==null || userHash[key]==null)	{
	  				userHash[key]=0;	  				
	  			}
	  			pts.givepoints(key,points);
	  			message.channel.send(message.author+" has now "+userHash[key]+" points.");
	  			return
	  			}
	  		//roll dices commands like !roll 2d6
	  		if(message.content.startsWith(prefix+"roll ")){	
	  			var string = message.content.split(" ");
	  			message.channel.send(launcher.launcher(string[1]));
	  			}
	  		//calculator functions
	  		if(message.content.startsWith(prefix+"calc ")){
	  			var string = message.content.split(" ");
	  			message.channel.send(calc.interpreter(string[1]));
	  		}
	  		//prime numbers function
	  		if(message.content.startsWith(prefix+"isPrime ")){
	  			var string = message.content.split(" ");	  			
	  			message.channel.send(prime.isPrime(+string[1],[1]));
	  		}
	  		if(message.content.startsWith(prefix+"nPrime ")){
	  			var string = message.content.split(" ");
	  			message.channel.send(prime.nPrime(+string[1]));
	  		}//throw in gcd, why not
	  		if(message.content.startsWith(prefix+"gcd ")){
	  			var string = message.content.split(" ");	  			
	  			message.channel.send(prime.gcd(+string[1], +string[2]));
	  		}
	  		if(message.content.startsWith(prefix+"primeRange ")){
	  			var string = message.content.split(" ");
	  			message.channel.send(prime.primeRange(+string[1],+string[2]))
	  		}

	  		//duel fonctions	
	  		if(message.content.startsWith(prefix+"challengeDuel ")){
	  			var initiator = message.author.username;
	  			var string = message.content.split(" ");
	  			var target = string[1];
	  			if(initiator==target){
	  				message.channel.send("You have won over yourself, congratz!")
	  				return;
	  			}
	  			duel.initiateDuel(initiator, target);
	  			message.channel.send(target +" you have been challenge in a duel by "+initiator+".");
	  			message.channel.send("Type !acceptDuel if you accept or !refuseDuel if you're too affraid.")
	  		}
	  		if(message.content.startsWith(prefix+"acceptDuel")){
	  			duel.acceptDuel(message.author.username);
	  			message.channel.send("Duel is starting, in 3-2-1 GO!")
	  			message.channel.send("Type !duelRoll <typeRoll>, like !duelRoll 1d20 or whatever.")
	  		}
	  		if(message.content.startsWith(prefix+"duelRoll ")){	
	  			var typeRoll = message.content.split(" ");
	  			message.channel.send(duel.duelRoll(message.author.username, typeRoll[1]))
	  		}
	  		if(message.content.startsWith(prefix+"endDuel")){	
	  			message.channel.send(duel.endDuel());
	  		}
	  		if(message.content.startsWith(prefix+"clearDuel")){	
	  			duel.clearDuelData();
	  		}
	  		if(message.content.startsWith(prefix+"refuseDuel")){	
	  			duel.clearDuelData();
	  			message.channel.send("Duel is ready to be initiated again.")
	  		}	  		
	}	
}

});

//keypress commands
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.shift && key.name == 'm') {
    NotifiyChannel.send("What if I told you.... you have bad taste in music!");
  }
  if (key && key.shift && key.name == 'c') {
    NotifiyChannel.send("ChipChocolate plz carry us! ChipChocolate for president!");
  }
  //to keep node feature to exit program with ctrl+c
  if (key && key.ctrl && key.name == 'c') {
    process.exit(1);
  }
});

process.stdin.setRawMode(true);


