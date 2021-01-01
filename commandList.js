const rollCommands = require("./commands/rollCommands");
const helpCommand = require("./commands/helpCommand");
const converterCommands = require("./commands/converterCommands");
const primeCommands = require("./commands/primeCommands");
const randomNameCommands = require("./commands/randomNameCommands");
const duelCommands = require("./commands/duelCommands");
const gameCommands = require("./commands/gamesCommands");
const pointsCommands = require("./commands/pointsCommands");
const shitPostCommands = require("./commands/shitPostCommands");
const moviesCommands = require("./commands/moviesCommands");
const weatherCommands = require("./commands/weatherCommands");
const minecraftCommands = require("./commands/minecraftCommands");

let commandList = {};

commandList["help"] = helpCommand.help;

commandList["roll"] = rollCommands.roll;
commandList["calc"] = rollCommands.calc;

commandList["bin2Dec"] = converterCommands.bin2Dec;
commandList["dec2Bin"] = converterCommands.dec2Bin;

commandList["nPrime"] = primeCommands.nPrime;
commandList["gcd"] = primeCommands.gcd;
commandList["isPrime"] = primeCommands.isPrime;
commandList["primeRange"] = primeCommands.primeRange;

commandList["randomNames"] = randomNameCommands.randomNames;
commandList["changeName"] = randomNameCommands.changeName;
commandList["resetName"] = randomNameCommands.resetName;

commandList["challengeDuel"] = duelCommands.challengeDuel;
commandList["acceptDuel"] = duelCommands.acceptDuel;
commandList["duelRoll"] = duelCommands.duelRoll;
commandList["endDuel"] = duelCommands.endDuel;
commandList["clearDuel"] = duelCommands.clearDuel;
commandList["refuseDuel"] = duelCommands.refuseDuel;

commandList["allGames"] = gameCommands.allGames;
commandList["rollGames"] = gameCommands.rollGames;
commandList["addGame"] = gameCommands.addGame;

commandList["addMe"] = pointsCommands.addMe;
commandList["myPoints"] = pointsCommands.myPoints;
commandList["allPoints"] = pointsCommands.allPoints;
commandList["give"] = pointsCommands.give;

commandList["benedict"] = shitPostCommands.benedict;
commandList["shitPost"] = shitPostCommands.shitPost;

commandList["movies"] = moviesCommands.movies;

commandList["weather"] = weatherCommands.weather;

commandList["mcUUID"] = minecraftCommands.getMinecraftUUID;
commandList["mcNetherCoords"] = minecraftCommands.minecraftNetherCoord;
commandList["mcGetCoords"] = minecraftCommands.mcGetCoords;
commandList["mcSaveCoords"] = minecraftCommands.mcSaveCoords;

module.exports = {
    commandList: commandList,
};
