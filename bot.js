const Discord = require('discord.js');
const music = require('discord.js-music-v11');
const Bot = new Discord.Client();
const auth = require('./auth.json');
const token = auth.token;

var winnerOfTheDay;

//to join or disconnect the bot from channel
var generalChannel;

//to send message without using message object
var NotifiyChannel;

var help;

var fs = require("fs");
var contents  = fs.readFileSync("userHash.json");
userHash = JSON.parse(contents);
var helpcontent = fs.readFileSync("help.json");
help = JSON.parse(helpcontent);

music(Bot);
Bot.login(token);

// web crawler related
var Crawler = require("node-webcrawler");
var url = require('url');

//key press var and begin process
var keypress = require('keypress'); 
keypress(process.stdin);

//activate bot
Bot.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
    winnerOfTheDay = Bot.users.random().username
    givepoint(winnerOfTheDay);
    if(winnerOfTheDay=="Clyde" || winnerOfTheDay=="Morkh's Bot"){
    	changeWinner();
    }
    var channel = Bot.channels.find("id", "353747084819693570");
    NotifiyChannel=channel;

    var channel2 = Bot.channels.get("353747084819693571");
    generalChannel=channel2;
    Bot.user.setGame("Node.js")

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

//give custom number points to user-key
function givepoints(key, points){
	console.log(points)
	//check if points is number
	if(!Number.isInteger(points)){
		NotifiyChannel.send("Teehee")
		return;
	}
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

//launche dices, needs string input like 2d6
function launcher(d){
	var dice = d.split("d")
	var number = +dice[0]
	var face = +dice[1]
	var somme=0
	var result=[]
	
	if(number<=0){return "You rolled  a 0, congratz!"}
	if (face <=0){return "Please use dices with at least 1 face"}

	for(var i=0; i<number;i++){
		var tir = Math.floor(Math.random()*face+1)
		somme+=tir;
		result.push(tir)
	}
	
	if(number==1 && face==20 && somme==20){return "You rolled a 20! Critical hit!"}
	if(number==1 && face==20 && somme==1){return "You rolled a 1! Fumble!"}
	if(somme==face*number){return "You rolled a "+somme+ ". Best in possible outcome."}
	if(number>1){
		return "You rolled a "+somme+". Your results were "+result+"."
	}else{
		return "You rolled a "+somme+"."
	}
	
}

//evaluate simple expression
function eval(a, b, c){
	if(b=='+'){
		return a+c
	}
	if(b=='*'){
		return a*c
	}
	if(b=='/'){
		return a/c
	}
	if(b=='-'){
		return a-c
	}
	if(b=='^'){
		return Math.pow(a,c)
	}		
}

//string to array for calculator functions
function toArray(exp){
	var result =[]
	var string=""
	for (var i=0; i<=exp.length;i++){
		if(exp.charAt(i)=='+'||exp.charAt(i)=='-'
			||exp.charAt(i)=='*' ||exp.charAt(i)=='/'||exp.charAt(i)=='^'){
			result.push(string);
			result.push(exp.charAt(i));
			string="";
			continue
		}
		string+=exp.charAt(i);
		if(i==exp.length-1){
			result.push(string)
		}
		

	}
	return result
}

//interpretor for input string from calc chat command
function interpreter(exp){
	exp=toArray(exp)
	//string to int//float
	for(var i=0;i<exp.length;i++){
		if(i%2==0){
			exp[i]=+exp[i]
		}
	}
	var i=0
	//evaluate * and / first
	while(i!=exp.length){
		if (exp[i]=="*" || exp[i]=="/"|| exp[i]=="^"){
			var terme = eval(exp[i-1], exp[i], exp[i+1])
			var test=exp.slice(0,i-1)
			test.push(terme)
			test2=exp.slice(i+2, exp.length)
			test=test.concat(test2)
			exp=test;
			i=0						
		}
		i++
	}
	if(exp.length==1){
		return exp[0]
	}
	var i=0
	var test=[]
	//evaluate rest.
	while(exp.length!=1){
		if(exp[i]=="+" ||exp[i]=="-"){
			var terme = eval(exp[i-1], exp[i], exp[i+1])
			test=[terme].concat(exp.slice(i+2, exp.length))
			exp=test
			i=0
		}
		i++
	}
	return exp[0]
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
            console.log(value[5]);
            NotifiyChannel.send("You have a Kill/Death ratio of " + value[5]); 
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
			NotifiyChannel.send("Your username is not initialized in the bot code, ask your Discord server admin.");
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
  		//winner of the day commands
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
    	//bot will leave or join general channel	
    	case "!joinGeneral":!
    		joinGeneralChannel();
    		break;
    	case "!leaveGeneral":
    		joinGeneralChannel();
    		leaveGeneralChannel();
    		break;

    	//point system commands
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
  			message.channel.send(key+" has now "+userHash[key]+" points.");
  			break;

  		case "!allpoints":
  			message.channel.send(JSON.stringify(userHash));
  			break;
  		case "!resetpoints":
  			if(message.author.username=="Morkh"){
  				resetPoints();
  				message.channel.send(userHash);  
  			}else{
  				message.channel.send("You don't have the permission to do that");
  			}
  		case "!help":
  			message.channel.send(help);
  			break;
  		case "!leaveCurrent": 
  				joinGeneralChannel();
  				leaveGeneralChannel();
  				break;
  		case "!getR6Kd":
  				launchR6Crawler(message.author.username)
  				break; 		

  		//to call different functions, more complicated
  		default :
  				//message author will recieve points
  		 	 if(message.content.startsWith(prefix+"give points ")){
	  			var key =  message.author.username;
	  			var string = message.content.split(" "); 
	  			var points = +string[string.length-1];			
	  			givepoints(key,points);
	  			message.channel.send(message.author+" has now "+userHash[key]+" points.");
	  			return
	  		}
	  			//user will give specified user points !give usename 10
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
	  			givepoints(key,points);
	  			message.channel.send(key+" has now "+userHash[key]+" points.");
	  			return
	  			}

	  		if(message.content.startsWith(prefix+"roll ")){	
	  			var string = message.content.split(" ");
	  			message.channel.send(launcher(string[1]));
	  			}
	  		if(message.content.startsWith(prefix+"calc ")){
	  			var string = message.content.split(" ")
	  			NotifiyChannel.send(interpreter(string[1]))
	  		}	

	}

	
}

});

//keypress commands
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.shift && key.name == 'm') {
    NotifiyChannel.send("What if I told you.... you have shit taste in music!");
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
        

