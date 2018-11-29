const Discord = require('discord.js');
const Bot = new Discord.Client();
const auth = require('./auth.json');
const token = auth.token;
Bot.login(token);

var cumberbatch = require('cumberbatch-name');

//const from other modules
const music = require('discord.js-music-v11');
const calc = require('./calc.js');
const launcher = require('./dicelauncher.js');
const duel = require('./duel.js');
const prime = require('./prime.js');
const name = require('./randomName.js');
const fortnite = require('./fortnite.js');

const translate = require('google-translate-api');

const { Pool, Client } = require('pg');
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'morkhbot',
	password: 'admin',
	port: 5432
});

//server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json('application/json'));

// web crawler related
var Crawler = require('node-webcrawler');
var url = require('url');

//to join or disconnect the bot from channel
var generalChannel;

//to send message without using message object
var NotifyChannel;

var botTestChannel;

//var from other modules
var help;

var fs = require('fs');
var helpcontent = fs.readFileSync('help.json');
help = JSON.parse(helpcontent);

music(Bot);

//activate bot
Bot.on('ready', () => {
	console.log(`[Start] ${new Date()}`);
	initUsers();

	//init variables for channels
	var channel = Bot.channels.find('id', '353747084819693570');
	NotifyChannel = channel;

	var channel2 = Bot.channels.get('353747084819693571');
	generalChannel = channel2;

	var channel3 = Bot.channels.find('id', '391706259923140618');
	botTestChannel = channel3;
	//Bot.user.setActivity("Node.js")
});

//fortnite webhook
app.post('/webhook', function(req, res) {
	NotifyChannel.send(req.body.user_name + ' has pushed a new commit for ' + req.body.project.name + '.');
	NotifyChannel.send(req.body.commits[0].message);
	NotifyChannel.send('Check it out at http://108.61.78.227:8888/');
	res.send({ message: 'we received webhook' });
});

app.listen(8000, () => console.log('Now listening to 8000'));

//iterate overs users to initate them in userhash
function initUsers() {
	request = 'select name from userpoints;';
	var allUserDB = [];

	pool.query(request, (err, response) => {
		if (response) {
			allUserDB = parseRows(response);
		}
	});

	for (user of Bot.users) {
		if (arrayContains(user[1].username, allUserDB)) {
			request = "insert into userpoints values ('" + user[1].username + "',0)";

			pool.query(request, (err, response) => {
				if (response) {
					console.log(user[1].username + ' has been added to database.');
				}
			});
		}
	}
}

function arrayContains(val, array) {
	return array.indexOf(val) > -1;
}

//bot will join general voice chat
function joinGeneralChannel() {
	generalChannel
		.join()
		.then(connection => console.log('Connected'))
		.catch(console.error);
}

//bot will leave general voice chat
function leaveGeneralChannel() {
	generalChannel.leave();
	console.log('Disconnected');
}

function generateShitPost(text) {
	var result = '';
	for (var j = 1; j < text.length; j++) {
		for (var i = 0; i < text[j].length; i++) {
			result += ':regional_indicator_' + text[j].charAt(i) + ': ';
		}
		result += '\r\n';
	}

	return result;
}

function getRandomfromArray(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function parseRows(array) {
	var result = [];
	for (var i = 0; i < array.rows.length; i++) {
		for (var key in array.rows[i]) {
			result.push(array.rows[i][key]);
		}
	}
	return result;
}

function parseGame(array) {
	var result = '';
	for (var i = 1; i < array.length; i++) {
		result += array[i];
		if (i != array.length - 1) {
			result += ' ';
		}
	}
	return result;
}

function parseLanguages() {
	var result = '';
	var it = 0;
	for (key in translate.languages) {
		it++;
		result += key + ': ' + translate.languages[key] + '\n';
		if (it == 105) {
			break;
		}
	}
	return result;
}

Bot.on('messageReactionAdd', (reaction, user) => {
	generalChannel.send(user.username + ' reacted to ' + reaction.message.author + ' with ' + reaction._emoji.name);
});

//chat commands
let prefix = '!';
Bot.on('message', message => {
	if (message.author.id === Bot.user.id || message.author.bot) return;
	let args = message.content.split(' ').slice(1);

	//huge switch case, seems to be faster than if then else
	if (message.content.startsWith(prefix)) {
		var cmd = message.content;

		switch (cmd) {
			case '!roll':
				message.channel.send(
					message.author.username + ' has rolled ' + (Math.floor(Math.random() * 100) + 1) + '!'
				);
				break;

			//bot will leave or join general channel
			case '!joinGeneral':
				joinGeneralChannel();
				break;

			case '!leaveGeneral':
				leaveGeneralChannel();
				break;

			case '!leaveCurrent':
				joinGeneralChannel();
				leaveGeneralChannel();
				break;

			case '!changeName':
				var newName = name.getRandomName();
				message.channel.send('New name is ' + newName);
				message.member.setNickname(newName).catch(console.error);
				break;

			case '!resetName':
				message.channel.send('Name is back to normal');
				message.member.setNickname('').catch(console.error);
				break;

			case '!landingZone':
				message.channel.send(fortnite.getLandingZone());
				break;
			//point system commands
			case '!points':
				var key = message.author.username;
				request = "select points from userpoints where name='" + key + "'";

				pool.query(request, (err, response) => {
					if (response) {
						message.channel.send(key + ' has ' + response.rows[0]['points'] + ' points.');
					}
				});

				break;

			case '!allPoints':
				request = 'select * from userpoints';
				pool.query(request, (err, response) => {
					if (response) {
						message.channel.send(parseRows(response));
					}
				});

				break;

			case '!help':
				message.channel.send(help);
				break;

			case '!benedict':
				message.channel.send(cumberbatch());
				break;

			case '!languages':
				message.channel.send(parseLanguages());
				break;
			case '!allGames':
				request = 'select * from games';
				pool.query(request, (err, response) => {
					if (response) {
						message.channel.send(parseRows(response));
					}
				});
				break;
			case '!rollGames':
				request = 'select * from games';
				pool.query(request, (err, response) => {
					if (response) {
						message.channel.send(getRandomfromArray(parseRows(response)));
					}
				});
				break;

			//to call different functions, more complicated
			default:
				//user will give specified user points !give username 10
				if (message.content.startsWith(prefix + 'give ')) {
					//console.log(key)
					var string = message.content.split(' ');
					if (string.length > 3) {
						message.channel.send('Invalid command');
						return;
					}
					//key ==user
					var key = string[1];
					var points = +string[string.length - 1];

					request =
						"update userpoints set points=(select points from userpoints where name='" +
						key +
						"')+" +
						points +
						" where name='" +
						key +
						"'";

					pool.query(request, (err, response) => {
						if (response) {
							request = "select points from userpoints where name='" + key + "'";
							pool.query(request, (err, response) => {
								if (response) {
									message.channel.send(key + ' has now ' + response.rows[0]['points'] + ' points');
								}
							});
						}
					});

					return;
				}

				if (message.content.startsWith(prefix + 'addGame ')) {
					var string = message.content.split(' ');
					//var newGame=string[1];
					var newGame = parseGame(string);
					//console.log(newGame);

					request = 'INSERT INTO games VALUES' + "('" + newGame + "');";
					//console.log(request);

					pool.query(request, (err, response) => {
						if (response) {
							message.channel.send('New Game was added to database.');
						} else {
							message.channel.send(
								"No response from database. Maybe you have a ' in the name of your game."
							);
						}
					});
				}

				if (message.content.startsWith(prefix + 'shitPost ')) {
					var string = message.content.split(' ');
					message.channel.send(generateShitPost(string));
				}

				//roll dices commands like !roll 2d6
				if (message.content.startsWith(prefix + 'roll ')) {
					var string = message.content.split(' ');
					message.channel.send(launcher.launcher(string[1]));
				}
				//calculator functions
				if (message.content.startsWith(prefix + 'calc ')) {
					var string = message.content.split(' ');
					message.channel.send(calc.interpreter(string[1]));
				}
				//prime numbers function
				if (message.content.startsWith(prefix + 'isPrime ')) {
					var string = message.content.split(' ');
					message.channel.send(prime.isPrime(+string[1], [1]));
				}
				if (message.content.startsWith(prefix + 'nPrime ')) {
					var string = message.content.split(' ');
					message.channel.send(prime.nPrime(+string[1]));
				} //throw in gcd, why not
				if (message.content.startsWith(prefix + 'gcd ')) {
					var string = message.content.split(' ');
					message.channel.send(prime.gcd(+string[1], +string[2]));
				}
				if (message.content.startsWith(prefix + 'primeRange ')) {
					var string = message.content.split(' ');
					message.channel.send(prime.primeRange(+string[1], +string[2]));
				}
				//translate
				if (message.content.startsWith(prefix + 'translate/')) {
					var string = message.content.split('/');
					//console.log(string)
					translate(string[1], { from: string[2], to: string[3] })
						.then(res => {
							message.channel.send(res.text);
							//=> I speak English
							//message.channel.send(res.from.text.autoCorrected);
						})
						.catch(err => {
							console.error(err);
						});
				}

				//duel fonctions
				if (message.content.startsWith(prefix + 'challengeDuel ')) {
					var initiator = message.author.username;
					var string = message.content.split(' ');
					var target = string[1];
					if (initiator == target) {
						message.channel.send('You have won over yourself, congratz!');
						return;
					}
					duel.initiateDuel(initiator, target);
					message.channel.send(target + ' you have been challenge in a duel by ' + initiator + '.');
					message.channel.send("Type !acceptDuel if you accept or !refuseDuel if you're too affraid.");
				}
				if (message.content.startsWith(prefix + 'acceptDuel')) {
					duel.acceptDuel(message.author.username);
					message.channel.send('Duel is starting, in 3-2-1 GO!');
					message.channel.send('Type !duelRoll <typeRoll>, like !duelRoll 1d20 or whatever.');
				}
				if (message.content.startsWith(prefix + 'duelRoll ')) {
					var typeRoll = message.content.split(' ');
					message.channel.send(duel.duelRoll(message.author.username, typeRoll[1]));
				}
				if (message.content.startsWith(prefix + 'endDuel')) {
					message.channel.send(duel.endDuel());
				}
				if (message.content.startsWith(prefix + 'clearDuel')) {
					duel.clearDuelData();
				}
				if (message.content.startsWith(prefix + 'refuseDuel')) {
					duel.clearDuelData();
					message.channel.send('Duel is ready to be initiated again.');
				}
		}
	}
});
