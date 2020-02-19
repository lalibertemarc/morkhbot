const cumberbatch = require("cumberbatch-name");
const helpers = require("./services/helperFunctions.js");
const rollService = require("./services/rollService.js");
const calculator = require("./services/calc.js");
const prime = require("./services/prime.js");
const converter = require("./services/convert.js");
const name = require("./services/randomName.js");
const duel = require("./services/duel.js");
const webResquestHelper = require("./services/webRequesterHelper.js");
const minecraftService = require("./services/minecraftService.js");
const Command = require("./models/Command.js");

let commandList = {};

const help = new Command("!help", "Get the url to see a list of all commands", function(message, args) {
    let commandResponse = `Please visit http://${process.env.HOST}:${process.env.PORT}/views/help to see the available commands`;
    helpers.commandResponse(message, this, commandResponse);
});

commandList["help"] = help;

//Roll and calc commands
const roll = new Command("!roll", "Roll a random number between 1 and 100 or roll nDk dice", function(message, args) {
    let commandResponse = rollService.roll(args[0], message.author.username);
    helpers.commandResponse(message, this, commandResponse);
});
commandList["roll"] = roll;

//TODO: fix calc command returning NaN if user inputs a negative number
/* calc service something i did in college out of boredom in classes
    using eval is the simple choice here but I kind wanna keep it for legacy sake.
*/
const calc = new Command(
    "!calc",
    "Calculator function, also used for math with dices. !calc <operation> | !calc 1d20+10",
    function(message, args) {
        let commandResponse = args[0] + " = " + calculator.interpreter(args[0]);
        helpers.commandResponse(message, this, commandResponse);
    }
);

const bin2Dec = new Command("!bin2Dec", "Converts binary string into decimal number", function(message, args) {
    let commandResponse = converter.bin2Dec(args[0]);
    helpers.commandResponse(message, this, commandResponse);
});

const dec2Bin = new Command("!dec2Bin", "Converts a number into a binary string : !dec2Bin <number>", function(
    message,
    args
) {
    let commandResponse = converter.dec2Bin(+args[0]);
    helpers.commandResponse(message, this, commandResponse);
});

commandList["calc"] = calc;
commandList["bin2Dec"] = bin2Dec;
commandList["dec2Bin"] = dec2Bin;

//Prime Commands
const isPrime = new Command("!isPrime", "Is the given number a prime number? !isPrime <number>", function(
    message,
    args
) {
    let commandResponse = "";
    if (helpers.isNumber(args[0])) commandResponse = prime.isPrime(+args[0], [1]);
    else commandResponse = "Given argument is not a numerical.";
    helpers.commandResponse(message, this, commandResponse);
});

const nPrime = new Command("!nPrime", "Gives all the n first prime numbers. !nPrime <n>", function(message, args) {
    let commandResponse = "";
    if (helpers.isNumber(args[0])) commandResponse = prime.nPrime(+args[0]);
    else commandResponse = "Given argument is not a numerical.";
    helpers.commandResponse(message, this, commandResponse);
});

const gcd = new Command(
    "!gcd",
    "Gives the greater common diviser between the 2 given arguments. !gcd <number> <number>",
    function(message, args) {
        var commandResponse = "";
        if (helpers.isNumber(args[0]) || helpers.isNumber(args[1])) commandResponse = prime.gcd(+args[0], +args[1]);
        else commandResponse = "One of the given arguments is not a numerical.";
        helpers.commandResponse(message, this, commandResponse);
    }
);

const primeRange = new Command(
    "!primeRange",
    "Gives all the prime numbers in the given argument range. !primeRange <lower> <upper>",
    function(message, args) {
        var args = message.content.split(" ");
        var commandResponse = "";
        if (helpers.isNumber(args[0]) || helpers.isNumber(args[1]))
            commandResponse = prime.primeRange(+args[0], +args[1]);
        else commandResponse = "One of the given arguments is not a numerical.";
        helpers.commandResponse(message, this, commandResponse);
    }
);
commandList["nPrime"] = nPrime;
commandList["gcd"] = gcd;
commandList["isPrime"] = isPrime;
commandList["primeRange"] = primeRange;

//Random Name commands
const changeName = new Command("!changeName", "The bot will give you a random name", function(message, args) {
    let newName = name.getRandomName();
    message.member.setNickname(newName).catch(err);
    let commandResponse = `Your new name is ${newName}`;
    helpers.commandResponse(message, this, commandResponse);
});

const randomNames = new Command("!randomNames", "Gives a list of random Medieval names", function(message, args) {
    let commandResponse = "";
    if (helpers.isNumber(args[0])) {
        for (let i = 0; i < +args[0]; i++) {
            commandResponse += name.getRandomName() + "\n";
        }
    } else commandResponse = "Given argument is not numerical.";

    helpers.commandResponse(message, this, commandResponse);
});

const resetName = new Command("!resetName", "The Bot will restore your old name", function(message, args) {
    message.member.setNickname("").catch(error);
    var commandResponse = "Name is back to normal";
    helpers.commandResponse(message, this, commandResponse);
});
commandList["randomNames"] = randomNames;
commandList["changeName"] = changeName;
commandList["resetName"] = resetName;

//duels commands
const challengeDuel = new Command("!challengeDuel", "Challenge a user in a game of dice", function(message, args) {
    var initiator = message.author.username;
    var args = message.content.split(" ");
    var target = args[1];
    var commandResponse = duel.initiateDuel(initiator, target);
    helpers.commandResponse(message, this, commandResponse);
});

const acceptDuel = new Command("!acceptDuel", "Accepts the duel your opponent sent you", function(message, args) {
    var commandResponse = duel.acceptDuel(message.author.username);
    helpers.commandResponse(message, this, commandResponse);
});

const duelRoll = new Command("!duelRoll", "Roll a dice when its your turn in the duel. !duelRoll nDk", function(
    message,
    args
) {
    var typeRoll = message.content.split(" ");
    var commandResponse = duel.duelRoll(message.author.username, typeRoll[1]);
    helpers.commandResponse(message, this, commandResponse);
});

const endDuel = new Command("!endDuel", "Ends the duel", function(message, args) {
    var commandResponse = duel.endDuel();
    helpers.commandResponse(message, this, commandResponse);
});

const clearDuel = new Command("!clearDuel", "Clears the duel data in case something goes wrong", function(
    message,
    args
) {
    var commandResponse = duel.clearDuelData();
    helpers.commandResponse(message, this, commandResponse);
});

const refuseDuel = new Command("!refuseDuel", "Refuse the duel your opponent just sent you", function(message, args) {
    var commandResponse = duel.refuseDuel();
    helpers.commandResponse(message, this, commandResponse);
});
commandList["challengeDuel"] = challengeDuel;
commandList["acceptDuel"] = acceptDuel;
commandList["duelRoll"] = duelRoll;
commandList["endDuel"] = endDuel;
commandList["clearDuel"] = clearDuel;
commandList["refuseDuel"] = refuseDuel;

//Games Command
var allGames = new Command(
    "!allGames",
    "Get all available games to roll when you dont know what to play",
    async function(message, args) {
        let commandResponse = "";
        try {
            let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.READ_API}/games`;
            let response = await webResquestHelper.getAsync(url);
            if (response.data.status == 200) commandResponse = helpers.parseGames(response.data.payload);
            else commandResponse = "Unexpected Error, please retry";
        } catch (error) {
            commandResponse = "Unexpected Error, please retry";
        }
        helpers.commandResponse(message, this, commandResponse);
    }
);

var rollGames = new Command(
    "!rollGames",
    "Roll a random game to play if you have no inspiration on what to play",
    async function(message, args) {
        let commandResponse = "";
        try {
            let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.READ_API}/games`;
            let response = await webResquestHelper.getAsync(url);
            if (response.data.status == 200) commandResponse = helpers.getRandomfromArray(response.data.payload).name;
            else commandResponse = "Unexpected Error, please retry";
        } catch (error) {
            commandResponse = "Unexpected Error, please retry";
        }
        helpers.commandResponse(message, this, commandResponse);
    }
);

var addGame = new Command("!addGame", "Add a game in the database to get a chance to roll it", async function(
    message,
    args
) {
    let commandResponse = "";
    try {
        let newGame = helpers.parseArgs(args);
        let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.WRITE_API}/games`;
        let response = await webResquestHelper.putAsync(url, { name: newGame });
        commandResponse = response.data.message;
    } catch (error) {
        commandResponse = "Unexpected Error, please retry";
    }
    helpers.commandResponse(message, this, commandResponse);
});

commandList["allGames"] = allGames;
commandList["rollGames"] = rollGames;
commandList["addGame"] = addGame;

//points system
var addMe = new Command("!addMe", "Add your username in the database for the point system", async function(
    message,
    args
) {
    let commandResponse = "";
    try {
        let user = message.author.username;
        let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.WRITE_API}/points`;
        let response = await webResquestHelper.putAsync(url, { name: user, points: 0 });
        commandResponse = response.data.message;
    } catch (error) {
        commandResponse = "Unexpected Error, please retry";
    }
    helpers.commandResponse(message, this, commandResponse);
});

var points = new Command("!myPoints", "Check how many points you have.", async function(message, args) {
    let commandResponse = "";
    try {
        let user = message.author.username;
        let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.READ_API}/points?name=${user}`;
        let response = await webResquestHelper.getAsync(url);
        if (response.data.status == 200) {
            let currentPoints = response.data.payload[0].points;
            commandResponse = `${user} has ${
                response.data.payload[0].point > 1 ? currentPoints + " points" : currentPoints + " point"
            } .`;
        } else if (response.data.status == 402) {
            commandList["addMe"].handler(message, null);
            return;
        }
    } catch (error) {
        console.log(error);
        commandResponse = "Unexpected Error in my points, please retry";
    }
    helpers.commandResponse(message, this, commandResponse);
});

var allPoints = new Command("!allPoints", "Check the points for every users in the database", async function(
    message,
    args
) {
    let commandResponse = "";
    try {
        let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.READ_API}/points?`;

        let response = await webResquestHelper.getAsync(url);
        if (response.data.status == 200) commandResponse = helpers.parsePoints(response.data.payload);
        else commandResponse = response.data.message;
    } catch (error) {
        commandResponse = "Unexpected Error, please retry";
    }
    helpers.commandResponse(message, this, commandResponse);
});

var give = new Command("!give", "Give that user some points : !give <user> <points>", async function(message, args) {
    let commandResponse = "";

    if (args.length != 2 || !helpers.isNumber(args[1])) commandResponse = "Invalid format for command.";
    else {
        let user = args[0];
        let points = +args[1];

        try {
            let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.WRITE_API}/points`;

            let response = await webResquestHelper.patchAsync(url, { name: user, points: points });
            if (response.data.status == 200) commandResponse = response.data.message;
            else if (response.data.status == 402) {
                let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.WRITE_API}/points`;
                let insertResponse = await webResquestHelper.putAsync(url, { name: user, points: points });
                commandResponse = insertResponse.data.message;
            }
        } catch (error) {
            console.log(error);
            commandResponse = "Unexpected Error, please retry";
        }
    }

    helpers.commandResponse(message, this, commandResponse);
});

commandList["addMe"] = addMe;
commandList["myPoints"] = points;
commandList["allPoints"] = allPoints;
commandList["give"] = give;
//random commands
var benedict = new Command("!benedict", "Gives a random Benedict Cumberbatch name", function(message) {
    try {
        var ben = cumberbatch();
    } catch (err) {
        console.log(err);
    }
    var commandResponse = ben;
    helpers.commandResponse(message, this, commandResponse);
});

var shitPost = new Command("!shitPost", "Generates beautiful text", function(message) {
    var string = message.content.split(" ");
    var commandResponse = helpers.generateShitPost(string);
    helpers.commandResponse(message, this, commandResponse);
});

commandList["benedict"] = benedict;
commandList["shitPost"] = shitPost;

var movies = new Command("!movies", "Will query OMDb api for a movie request", async (message, args) => {
    let title = args.join(" ");
    var url = `http://www.omdbapi.com/?t=${title}&apikey=f7ee9808`;

    try {
        let movieRequest = await webResquestHelper.getAsync(url, 3000, {
            json: true
        });

        let body = movieRequest.data;
        if (body.Response) helpers.movieResponse(message, body);
        else helpers.commandResponse(message, this, body.Error);
    } catch (exception) {
        helpers.commandResponse(message, this, exception);
    }
});

commandList["movies"] = movies;

var weather = new Command("!weather", "Will give the current weather for the asked city", async function(message) {
    var args = message.content.split(/ +/);
    var city = args[1];
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3a91dafd0698ffa38eb48d03f29b9d0c`;

    try {
        let weatherResponse = await webResquestHelper.getAsync(url, 3000, {
            json: true
        });
        let body = weatherResponse.data;
        var commandResponse = "";
        commandResponse += `Weather for ${body.name}: \n`;
        commandResponse += `Currently : ${body.weather[0].description}\n`;
        commandResponse += `Temp : ${body.main.temp} °C\n`;
        commandResponse += `Min : ${body.main.temp_min} °C\n`;
        commandResponse += `Max : ${body.main.temp_max} °C\n`;
        commandResponse += `Wind : ${body.wind.speed * 3.6} km/h to ${helpers.getCardinal(body.wind.deg)}`;
        if (body.rain) commandResponse += `Rain : ${body.rain["3h"]}\n`;

        helpers.commandResponse(message, this, commandResponse);
    } catch (error) {
        helpers.commandResponse(message, this, error);
    }
});
commandList["weather"] = weather;

let getMinecraftUUID = new Command("!mcUUID", "Get player UUID", async function(message) {
    let args = message.content.split(/ +/);
    let userName = args[1];
    try {
        let UUID = await minecraftService.getUserUUID(userName);
        let officialName = await minecraftService.getOfficialName(userName);
        helpers.minecraftResponse(message, UUID, officialName);
    } catch (error) {
        helpers.commandResponse(message, this, error);
    }
});
commandList["mcUUID"] = getMinecraftUUID;

let minecraftNetherCoord = new Command("!mcNetherCoords", "Get Nether Coordinates", function(message) {
    let args = message.content.split(/ +/);
    let coords = minecraftService.getNethercoord(+args[1], +args[2]);
    helpers.commandResponse(message, this, coords);
});
commandList["mcNetherCoords"] = minecraftNetherCoord;

let mcGetCoords = new Command("!mcGetCoords", "Get all saved locations on Morkh's minecraft server", function(
    message,
    args
) {
    helpers.commandResponse(
        message,
        this,
        `Visit http://${process.env.HOST}:${process.env.PORT}/views/minecraft to see all saved locations.`
    );
});

commandList["mcGetCoords"] = mcGetCoords;

let mcSaveCoords = new Command("!mcSaveCoords", "Save a location from Morkh's Minecraft server.", async function(
    message,
    args
) {
    let commandResponse = ` Visit http://${process.env.HOST}:${process.env.PORT}/views/minecraft to see all saved locations and save a new location.`;
    helpers.commandResponse(message, this, commandResponse);
});

commandList["mcSaveCoords"] = mcSaveCoords;
module.exports = {
    commandList: commandList
};
