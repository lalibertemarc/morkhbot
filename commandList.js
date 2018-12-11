var cumberbatch = require('cumberbatch-name');
const helpers = require('./helperFunctions.js')
const launcher = require('./dicelauncher.js');
const calculator = require('./calc.js');
const prime = require('./prime.js');
const converter = require('./convert.js')
const name = require('./randomName.js');
const fortnite = require('./fortnite.js');
const duel = require('./duel.js');

var commandList = {};
function Command(name, desc, hand){
	this.name = name;
	this.description = desc;
	this.handler = hand
}

//Roll and calc commands
var roll = new Command('!roll', "Roll a random number between 1 and 100 or roll nDk dice", function(message){
    var string = message.content.split(' ');
    if(string.length==1){
        var random = Math.floor(Math.random() * 100) + 1;
	    return `${message.author.username} has rolled ${random}! `
    }
    else
	    return launcher.launcher(string[1]);
	
})
commandList['roll'] = roll;

var calc = new Command('!calc', "Calculator function, used also for math with dices.", function(message){
    var string = message.content.split(' ');
	return calculator.interpreter(string[1]);
})

var bin2Dec = new Command('!bin2Dec', 'Converts binary string into decimal number', function(message){
    var args = message.content.split(" ");
	return converter.bin2Dec(args[1]);
})

var dec2Bin = new Command('!dec2Bin', 'Converts a number into a binary string', function(message){
    var args = message.content.split(" ");
	return converter.dec2Bin(+args[1]);
})
commandList['calc'] = calc;
commandList['bin2Dec'] = bin2Dec;
commandList['dec2Bin'] = dec2Bin;


//Prime Commands
var isPrime = new Command('!isPrime', "Is the given number a prime number?", function(message){
    var string = message.content.split(' ');
	return prime.isPrime(+string[1], [1])
})

var nPrime = new Command('!nPrime', 'Will give all the n first prime numbers.' ,function(message){
    var string = message.content.split(' ');
	return prime.nPrime(+string[1]);
})

var gcd = new Command('!gcd', "Give the greater common diviser between the 2 given arguments", function(message){
    var string = message.content.split(' ');
	return prime.gcd(+string[1], +string[2]);
})

var primeRange = new Command('!primeRange', 'Will give all the prime numbers in the given argument range', function(message){
    var string = message.content.split(' ');
	return prime.primeRange(+string[1], +string[2]);
})
commandList['nPrime'] = nPrime;
commandList['gcd'] = gcd;
commandList['isPrime'] = isPrime;
commandList['primeRange'] = primeRange;

//Random Name commands
var changeName = new Command('!changeName', 'The bot will give a random name', function(message){
    var newName = name.getRandomName();
    message.member.setNickname(newName).catch(err)
    return `Your new name is ${newName}`
});

var resetName = new Command('!resetName', 'The Bot will restore your old name', function(message){
    message.member.setNickname('')
    .then(console.log)
    .catch(error =>{
        return error.message;
    });
    return 'Name is back to normal';
})
commandList['changeName'] = changeName;
commandList['resetName'] = resetName;

//duels commands
var challengeDuel = new Command('!challengeDuel', 'Challenge a user in a game of dice', function(message){
    var initiator = message.author.username;
    var string = message.content.split(' ');
    var target = string[1];
    return duel.initiateDuel(initiator, target);  
})

var acceptDuel = new Command('!acceptDuel', 'Accepts the duel your opponent sent you', function(message){
    return  duel.acceptDuel(message.author.username);
})

var duelRoll = new Command('!duelRoll', 'Roll a dice when its your turn in the duel', function(message){
    var typeRoll = message.content.split(' ');
    return duel.duelRoll(message.author.username, typeRoll[1]);
})

var endDuel = new Command('!endDuel', 'Ends the duel', function(message){
    return duel.endDuel();
})

var clearDuel = new Command('!clearDuel', 'Clears the duel data in case something goes wrong', function(message){
    return  duel.clearDuelData();
})

var refuseDuel = new Command('!refuseDuel', 'Refuse the duel your opponent just sent you', function(message){
    return  duel.refuseDuel();
})
commandList['challengeDuel'] = challengeDuel;
commandList['acceptDuel'] = acceptDuel;
commandList['duelRoll'] = duelRoll;
commandList['endDuel'] = endDuel;
commandList['clearDuel'] = clearDuel;
commandList['refuseDuel'] = refuseDuel;


//random commands
var benedict = new Command('!benedict', "Give a random Benedict Cumberbatch name", function(message){
	try{
		var ben = cumberbatch();
	}catch(err)
	{
		console.log(err)
	}
	return ben
})

var shitPost = new Command('!shitPost', 'Generate beautiful text', function(message){
    var string = message.content.split(' ');
    return helpers.generateShitPost(string)
})

var landingZone = new Command('!landingZone', 'Gives you a random location to drop in Fortnite', function(message){
    return fortnite.getLandingZone();
})

commandList['benedict'] = benedict;
commandList['shitPost'] = shitPost
commandList['landingZone'] = landingZone;

module.exports = {
    commandList: commandList
}