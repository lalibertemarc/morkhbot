const Discord = require('discord.js');
const Bot = new Discord.Client();
const auth = require('./auth.json');
const token = auth.token;
Bot.login(token);

//const from other modules
const commands =require('./commandList.js');
var commandList = commands.commandList;
const helpers = require('./helperFunctions.js')

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


//to send message without using message object
var NotifyChannel;

//activate bot
Bot.on('ready', () => {
	console.log(`[Start] ${new Date()}`);
	initUsers();

	//init variables for channels
	NotifyChannel =  Bot.channels.get('353747084819693570');
	generalChannel = Bot.channels.get('353747084819693571');
	botTestChannel = Bot.channels.get('391706259923140618');
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
		var name = user[1].username;
		if (arrayContains(name, allUserDB)) {
			request = `insert into userpoints values (${name},0)`;

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

let reqCount = 0;
function botResponse(title,description, footer)
{
    const embedColor = helpers.getNextColor(reqCount++);
    return new Discord.RichEmbed()
    .setColor(embedColor)
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer)
}


Bot.on('messageReactionAdd', (reaction, user) => {
	var commandResonse = user.username + ' reacted to ' + reaction.message.author + ' with ' + reaction._emoji.name
	reaction.message.channel.send(botResponse("Emoji Reaction!", commandResonse,""));
});

//chat commands
let prefix = '!';
Bot.on('message', message => {
	if (message.author.id === Bot.user.id || message.author.bot) return;
	//huge switch case, seems to be faster than if then else
	if (message.content.startsWith(prefix)) {
		var cmd = message.content
		var array = cmd.split(' ')
		var command = array[0].substring(1, array[0].length);

		if(command in commandList)
			message.channel.send(botResponse(commandList[command].name, 
											commandList[command].handler(message), 
											commandList[command].description));
		else
			message.channel.send(botResponse("Invalid Command", "Please use !help command", ""));

		switch (cmd) {

			//point system commands
			case '!points':
				var key = message.author.username;
				request = `select points from userpoints where name='${key}'`;

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
						`update userpoints set points=(select points from userpoints where name='${key}') + ${points} where name='${key} '`;
					pool.query(request, (err, response) => {
						if (response) {
							request = `select points from userpoints where name='${key}'`;
							pool.query(request, (err, response) => {
								if (response) {
									points = response.rows[0]['points'];
									message.channel.send(`${key} has now ${points} points`);
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

					request = `INSERT INTO games VALUES ('${newGame}')`;
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
		}
	}
});
