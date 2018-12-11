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
        var commandResponse = `${message.author.username} has rolled ${random}! `   
    }
    else{
        var commandResponse = launcher.launcher(string[1])

    }
    return commandResponse
	
})
commandList['roll'] = roll;

var calc = new Command('!calc', "Calculator function, used also for math with dices.", function(message){
    var string = message.content.split(' ');
    var commandResponse = calculator.interpreter(string[1]);
	return commandResponse;
})

var bin2Dec = new Command('!bin2Dec', 'Converts binary string into decimal number', function(message){
    var args = message.content.split(" ");
    var commandResponse = converter.bin2Dec(args[1]);
	return commandResponse
})

var dec2Bin = new Command('!dec2Bin', 'Converts a number into a binary string', function(message){
    var args = message.content.split(" ");
    var commandResponse = converter.dec2Bin(+args[1]);
	return commandResponse;
})
commandList['calc'] = calc;
commandList['bin2Dec'] = bin2Dec;
commandList['dec2Bin'] = dec2Bin;


//Prime Commands
var isPrime = new Command('!isPrime', "Is the given number a prime number?", function(message){
    var string = message.content.split(' ');
    var commandResponse = prime.isPrime(+string[1], [1])
	return commandResponse
})

var nPrime = new Command('!nPrime', 'Will give all the n first prime numbers.' ,function(message){
    var string = message.content.split(' ');
    var commandResponse = prime.nPrime(+string[1]);
    return commandResponse
})

var gcd = new Command('!gcd', "Give the greater common diviser between the 2 given arguments", function(message){
    var string = message.content.split(' ');
    var commandResponse = prime.gcd(+string[1], +string[2]);
    return commandResponse
})

var primeRange = new Command('!primeRange', 'Will give all the prime numbers in the given argument range', function(message){
    var string = message.content.split(' ');
    var commandResponse = prime.primeRange(+string[1], +string[2]);
    return commandResponse
})
commandList['nPrime'] = nPrime;
commandList['gcd'] = gcd;
commandList['isPrime'] = isPrime;
commandList['primeRange'] = primeRange;

//Random Name commands
var changeName = new Command('!changeName', 'The bot will give a random name', function(message){
    var newName = name.getRandomName();
    message.member.setNickname(newName).catch(err)
    var commandResponse = `Your new name is ${newName}`
    return commandResponse
});

var resetName = new Command('!resetName', 'The Bot will restore your old name', function(message){
    message.member.setNickname('').catch(error);
    var commandResponse =  'Name is back to normal';
    return commandResponse
})
commandList['changeName'] = changeName;
commandList['resetName'] = resetName;

//duels commands
var challengeDuel = new Command('!challengeDuel', 'Challenge a user in a game of dice', function(message){
    var initiator = message.author.username;
    var string = message.content.split(' ');
    var target = string[1];
    var commandResponse = duel.initiateDuel(initiator, target);
    return commandResponse
})

var acceptDuel = new Command('!acceptDuel', 'Accepts the duel your opponent sent you', function(message){
    var commandResponse =  duel.acceptDuel(message.author.username);
    return commandResponse
})

var duelRoll = new Command('!duelRoll', 'Roll a dice when its your turn in the duel', function(message){
    var typeRoll = message.content.split(' ');
    var commandResponse = duel.duelRoll(message.author.username, typeRoll[1]);
    return commandResponse
})

var endDuel = new Command('!endDuel', 'Ends the duel', function(message){
    var commandResponse = duel.endDuel();
    return commandResponse
})

var clearDuel = new Command('!clearDuel', 'Clears the duel data in case something goes wrong', function(message){
    var commandResponse =  duel.clearDuelData();
    return commandResponse
})

var refuseDuel = new Command('!refuseDuel', 'Refuse the duel your opponent just sent you', function(message){
    var commandResponse =  duel.refuseDuel();
    return commandResponse
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
    var commandResponse = ben
    return commandResponse
})

var shitPost = new Command('!shitPost', 'Generate beautiful text', function(message){
    var string = message.content.split(' ');
    var commandResponse = helpers.generateShitPost(string)
    return commandResponse
})

var landingZone = new Command('!landingZone', 'Gives you a random location to drop in Fortnite', function(message){
    var commandResponse = fortnite.getLandingZone();
    return commandResponse
})

commandList['benedict'] = benedict;
commandList['shitPost'] = shitPost
commandList['landingZone'] = landingZone;

module.exports = {
    commandList: commandList
}