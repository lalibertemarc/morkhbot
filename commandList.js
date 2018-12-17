var cumberbatch = require("cumberbatch-name");
const helpers = require("./helperFunctions.js");
const launcher = require("./dicelauncher.js");
const calculator = require("./calc.js");
const prime = require("./prime.js");
const converter = require("./convert.js");
const name = require("./randomName.js");
const fortnite = require("./fortnite.js");
const duel = require("./duel.js");
const translate = require("google-translate-api");

const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "morkhbot",
  password: "admin",
  port: 5432
});

var commandList = {};
function Command(name, desc, hand) {
  this.name = name;
  this.description = desc;
  this.handler = hand;
}

//Roll and calc commands
var roll = new Command(
  "!roll",
  "Roll a random number between 1 and 100 or roll nDk dice",
  function(message) {
    var string = message.content.split(" ");
    if (string.length == 1) {
      var random = Math.floor(Math.random() * 100) + 1;
      var commandResponse = `${message.author.username} rolled ${random}! `;
    } else {
      var commandResponse = launcher.launcher(string[1]);
    }
    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);
commandList["roll"] = roll;

var calc = new Command(
  "!calc",
  "Calculator function, used also for math with dices.",
  function(message) {
    var string = message.content.split(/ +/);
    var commandResponse = string[1] + " = " + calculator.interpreter(string[1]);
    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var bin2Dec = new Command(
  "!bin2Dec",
  "Converts binary string into decimal number",
  function(message) {
    var args = message.content.split(" ");
    var commandResponse = "";
    if (
      args[1].includes("2") ||
      args[1].includes("3") ||
      args[1].includes("4") ||
      args[1].includes("5") ||
      args[1].includes("6") ||
      args[1].includes("7") ||
      args[1].includes("8") ||
      args[1].includes("9")
    )
      commandResponse = "ERROR: Argument is not binary";
    else commandResponse = converter.bin2Dec(args[1]);

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var dec2Bin = new Command(
  "!dec2Bin",
  "Converts a number into a binary string",
  function(message) {
    var args = message.content.split(" ");
    var commandResponse = converter.dec2Bin(+args[1]);

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);
commandList["calc"] = calc;
commandList["bin2Dec"] = bin2Dec;
commandList["dec2Bin"] = dec2Bin;

//Prime Commands
var isPrime = new Command(
  "!isPrime",
  "Is the given number a prime number?",
  function(message) {
    var string = message.content.split(" ");
    var commandResponse = prime.isPrime(+string[1], [1]);

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var nPrime = new Command(
  "!nPrime",
  "Gives all the n first prime numbers.",
  function(message) {
    var string = message.content.split(" ");
    var commandResponse = prime.nPrime(+string[1]);

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var gcd = new Command(
  "!gcd",
  "Gives the greater common diviser between the 2 given arguments",
  function(message) {
    var string = message.content.split(" ");
    var commandResponse = prime.gcd(+string[1], +string[2]);

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var primeRange = new Command(
  "!primeRange",
  "Gives all the prime numbers in the given argument range",
  function(message) {
    var string = message.content.split(" ");
    var commandResponse = prime.primeRange(+string[1], +string[2]);

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);
commandList["nPrime"] = nPrime;
commandList["gcd"] = gcd;
commandList["isPrime"] = isPrime;
commandList["primeRange"] = primeRange;

//Random Name commands
var changeName = new Command(
  "!changeName",
  "The bot will give you a random name",
  function(message) {
    var newName = name.getRandomName();
    message.member.setNickname(newName).catch(err);
    var commandResponse = `Your new name is ${newName}`;

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var resetName = new Command(
  "!resetName",
  "The Bot will restore your old name",
  function(message) {
    message.member.setNickname("").catch(error);
    var commandResponse = "Name is back to normal";

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);
commandList["changeName"] = changeName;
commandList["resetName"] = resetName;

//duels commands
var challengeDuel = new Command(
  "!challengeDuel",
  "Challenge a user in a game of dice",
  function(message) {
    var initiator = message.author.username;
    var string = message.content.split(" ");
    var target = string[1];
    var commandResponse = duel.initiateDuel(initiator, target);

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var acceptDuel = new Command(
  "!acceptDuel",
  "Accepts the duel your opponent sent you",
  function(message) {
    var commandResponse = duel.acceptDuel(message.author.username);
    return commandResponse;
  }
);

var duelRoll = new Command(
  "!duelRoll",
  "Roll a dice when its your turn in the duel",
  function(message) {
    var typeRoll = message.content.split(" ");
    var commandResponse = duel.duelRoll(message.author.username, typeRoll[1]);

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var endDuel = new Command("!endDuel", "Ends the duel", function(message) {
  var commandResponse = duel.endDuel();

  message.channel.send(
    helpers.botResponse(
      `${message.author.username} asked the ${this.name} command`,
      commandResponse,
      this.description,
      message.author.avatarURL
    )
  );
});

var clearDuel = new Command(
  "!clearDuel",
  "Clears the duel data in case something goes wrong",
  function(message) {
    var commandResponse = duel.clearDuelData();

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var refuseDuel = new Command(
  "!refuseDuel",
  "Refuse the duel your opponent just sent you",
  function(message) {
    var commandResponse = duel.refuseDuel();

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);
commandList["challengeDuel"] = challengeDuel;
commandList["acceptDuel"] = acceptDuel;
commandList["duelRoll"] = duelRoll;
commandList["endDuel"] = endDuel;
commandList["clearDuel"] = clearDuel;
commandList["refuseDuel"] = refuseDuel;

//translator commands
var languages = new Command(
  "!languages",
  "Gives a list of all available languages",
  function(message) {
    var commandResponse = helpers.parseLanguages(translate.languages);

    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var translater = new Command(
  "!translate",
  "Will translate something for you",
  async function(message) {
    var string = message.content.split("/");
    var commandResponse = "";
    try {
      commandResponse = await translate(string[1], {
        from: string[2],
        to: string[3]
      });
    } catch (error) {
      console.log(error.message);
    }

    commandResponse = commandResponse.text;
    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);
commandList["languages"] = languages;
commandList["translate"] = translater;

//Games Command
var allGames = new Command(
  "!allGames",
  "Get all available games to roll when you dont know what to play",
  async function(message) {
    var commandResponse = "";
    request = "select * from games";
    pool.query(request, (err, response) => {
      if (response) {
        commandResponse = helpers.parseRows(response);
        message.channel.send(
          helpers.botResponse(
            `${message.author.username} asked the ${this.name} command`,
            commandResponse,
            this.description,
            message.author.avatarURL
          )
        );
      }
    });
  }
);

var rollGames = new Command(
  "!rollGames",
  "Roll a random game to play if you have no inspiration on what to play",
  function(message) {
    request = "select * from games";
    pool.query(request, (err, response) => {
      if (response) {
        var commandResponse = helpers.getRandomfromArray(
          helpers.parseRows(response)
        );
        message.channel.send(
          helpers.botResponse(
            `${message.author.username} asked the ${this.name} command`,
            commandResponse,
            this.description,
            message.author.avatarURL
          )
        );
      }
    });
  }
);

var addGame = new Command(
  "!addGame",
  "Add a game in the database to get a chance to roll it",
  function(message) {
    var string = message.content.split(/ +/);
    var newGame = helpers.parseGame(string);
    request = `INSERT INTO games VALUES ('${newGame}')`;
    pool.query(request, (err, response) => {
      if (response) {
        var commandResponse = "New Game was added to database.";
        message.channel.send(
          helpers.botResponse(
            `${message.author.username} asked the ${this.name} command`,
            commandResponse,
            this.description,
            message.author.avatarURL
          )
        );
      } else {
        var commandResponse =
          "No response from database. Maybe you have a ' in the name of your game.";
        message.channel.send(
          helpers.botResponse(
            `${message.author.username} asked the ${this.name} command`,
            commandResponse,
            this.description,
            message.author.avatarURL
          )
        );
      }
    });
  }
);

commandList["allGames"] = allGames;
commandList["rollGames"] = rollGames;
commandList["addGame"] = addGame;

//points system
var addMe = new Command(
  "!addMe",
  "Add your username in the database for the point system",
  function(message) {
    var request1 = `select * from userpoints where name = '${
      message.author.username
    }'`;

    pool.query(request1, (err, response) => {
      if (response) {
        if (response.rows.length == 0) {
          //insert only if name is not present
          var request2 = `INSERT INTO userpoints VALUES ('${
            message.author.username
          }', 0)`;
          pool.query(request2, (err, response) => {
            if (response) {
              var commandResponse = `${
                message.author.username
              } was succesfully added to the database`;
              message.channel.send(
                helpers.botResponse(
                  `${message.author.username} asked the ${this.name} command`,
                  commandResponse,
                  this.description,
                  message.author.avatarURL
                )
              );
            }
          });
        } else {
          var commandResponse = `${
            message.author.username
          } is already in the database`;
          message.channel.send(
            helpers.botResponse(
              `${message.author.username} asked the ${this.name} command`,
              commandResponse,
              this.description,
              message.author.avatarURL
            )
          );
        }
      }
    });
  }
);

var points = new Command("!points", "Check how many points you have.", function(
  message
) {
  request = `select points from userpoints where name='${ message.author.username}'`;

  pool.query(request, (err, response) => {
    if (response) {
      if (response.rows[0] != undefined) {
        var commandResponse = `${message.author.username} has  ${response.rows[0]["points"]} points.`;
        message.channel.send(
          helpers.botResponse(
            `${message.author.username} asked the ${this.name} command`,
            commandResponse,
            this.description,
            message.author.avatarURL
          )
        );
      } else {
        var commandResponse = `${message.author.username} is not in database, please use the !addMe command`;
        message.channel.send(
          helpers.botResponse(
            `${message.author.username} asked the ${this.name} command`,
            commandResponse,
            this.description,
            message.author.avatarURL
          )
        );
      }
    }
  });
});

var allPoints = new Command(
  "!allPoints",
  "Check the points for every users in the database",
  function(message) {
    var request = "select * from userpoints";
    pool.query(request, (err, response) => {
      if (response) {
        var commandResponse = helpers.parseRows(response);
        message.channel.send(
          helpers.botResponse(
            `${message.author.username} asked the ${this.name} command`,
            commandResponse,
            this.description,
            message.author.avatarURL
          )
        );
      }
    });
  }
);

var give = new Command(
  "!give",
  "Give that user some points : !give <user> <points>",
  function(message) {
    var string = message.content.split(/ +/);
    if (string.length < 3) {
      var commandResponse = "Invalid format for command";
      message.channel.send(
        helpers.botResponse(
          `${message.author.username} asked the ${this.name} command`,
          commandResponse,
          this.description,
          message.author.avatarURL
        )
      );
      return;
    } else {
      var user = string[1];
      var points = string[2];
      var request1 = `select * from userpoints where name = '${user}'`;
      pool.query(request1, (err, response) => {
        if (response) {
          if (response.rows.length == 0) {
            //insert only if name is not present
            var request2 = `INSERT INTO userpoints VALUES ('${user}', ${points})`;
            pool.query(request2, (err, response) => {
              if (response) {
                var commandResponse = `${user} has now ${points} points.`;
                message.channel.send(
                  helpers.botResponse(
                    `${message.author.username} asked the ${this.name} command`,
                    commandResponse,
                    this.description,
                    message.author.avatarURL
                  )
                );
              }
            });
          } else {
            request3 = `update userpoints set points=(select points from userpoints where name='${user}') + ${points} where name='${user}'`;
            pool.query(request3, (err, response) => {
              if (response) {
                var request4 = `select points from userpoints where name='${user}'`;
                pool.query(request4, (err, response) => {
                  if (response) {
                    points = response.rows[0]["points"];
                    var commandResponse = `${user} has now ${points} points`;
                    message.channel.send(
                      helpers.botResponse(
                        `${message.author.username} asked the ${this.name} command`,
                        commandResponse,
                        this.description,
                        message.author.avatarURL
                      )
                    );
                  }
                });
              }
            });
          }
        }
      });
    }
  }
);

commandList["addMe"] = addMe;
commandList["points"] = points;
commandList["allPoints"] = allPoints;
commandList["give"] = give;
//random commands
var benedict = new Command(
  "!benedict",
  "Gives a random Benedict Cumberbatch name",
  function(message) {
    try {
      var ben = cumberbatch();
    } catch (err) {
      console.log(err);
    }
    var commandResponse = ben;
    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var shitPost = new Command("!shitPost", "Generates beautiful text", function(
  message
) {
  var string = message.content.split(" ");
  var commandResponse = helpers.generateShitPost(string);
  message.channel.send(
    helpers.botResponse(
      `${message.author.username} asked the ${this.name} command`,
      commandResponse,
      this.description,
      message.author.avatarURL
    )
  );
});

var landingZone = new Command(
  "!landingZone",
  "Gives you a random drop location in Fortnite",
  function(message) {
    var commandResponse = fortnite.getLandingZone();
    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

var help = new Command(
  "!help",
  "Gives a list of all available command",
  function(message) {
    var commandResponse = "";
    for (command in commandList)
      commandResponse +=
        commandList[command].name +
        " : " +
        commandList[command].description +
        "\n";
    message.channel.send(
      helpers.botResponse(
        `${message.author.username} asked the ${this.name} command`,
        commandResponse,
        this.description,
        message.author.avatarURL
      )
    );
  }
);

commandList["benedict"] = benedict;
commandList["shitPost"] = shitPost;
commandList["landingZone"] = landingZone;
commandList["help"] = help;

module.exports = {
  commandList: commandList
};
