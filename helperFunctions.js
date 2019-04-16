const Discord = require("discord.js");

function generateShitPost(text) {
    var result = "";
    for (var j = 1; j < text.length; j++) {
        for (var i = 0; i < text[j].length; i++) {
            result += ":regional_indicator_" + text[j].charAt(i) + ": ";
        }
        result += "\r\n";
    }

    return result;
}
function parseLanguages(languages) {
    var result = "";
    var it = 0;
    for (key in languages) {
        it++;
        result += key + ": " + languages[key] + "\n";
        if (it == 105) {
            break;
        }
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
    var result = "";
    for (var i = 1; i < array.length; i++) {
        result += array[i];
        if (i != array.length - 1) {
            result += " ";
        }
    }
    return result;
}
function getNextColor(int) {
    const CYCLE = 12; // Number of colors before the cycle repeats
    const SATURATION = [64, 64, 64]; // Hue; 0 = greyscale, 127 = high saturation
    const BRIGHTNESS = [191, 191, 191]; // Brightness; 0 = dark, 255 = bright

    const r = Math.floor(Math.sin((Math.PI / CYCLE) * 2 * int) * SATURATION[0]) + BRIGHTNESS[0];
    const g = Math.floor(Math.sin((Math.PI / CYCLE) * 2 * int + (Math.PI * 2) / 3) * SATURATION[1]) + BRIGHTNESS[1];
    const b = Math.floor(Math.sin((Math.PI / CYCLE) * 2 * int + (Math.PI * 4) / 3) * SATURATION[2]) + BRIGHTNESS[2];
    return r * 65536 + g * 256 + b;
}
let reqCount = 0;
function botResponse(title, description, footer, avatar) {
    const embedColor = getNextColor(reqCount++);
    return new Discord.RichEmbed()
        .setColor(embedColor)
        .setTitle(title)
        .setThumbnail(avatar)
        .setDescription(description)
        .setFooter(footer)
        .setTimestamp(new Date());
}

function commandResponse(message, command, commandResponse) {
    message.channel.send(
        botResponse(`${message.author.username} asked the ${command.name} command`, commandResponse, command.description, message.author.avatarURL)
    );
}

function movieResponse(message, title, description, footer, avatar) {
    message.channel.send(botResponse(title, description, footer, avatar));
}
function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

module.exports = {
    generateShitPost: generateShitPost,
    getNextColor: getNextColor,
    parseLanguages: parseLanguages,
    getRandomfromArray: getRandomfromArray,
    parseRows: parseRows,
    parseGame: parseGame,
    botResponse: botResponse,
    movieResponse: movieResponse,
    commandResponse: commandResponse,
    isNumber: isNumber
};
