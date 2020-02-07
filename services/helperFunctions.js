const Discord = require("discord.js");

function getCommand(string) {
  let array = string.split(/ +/);
  return array[0].substring(1, array[0].length);
}

function getArgs(message) {
  let array = message.split(/ +/);
  array.shift();
  return array;
}

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

function getRandomfromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function parseRows(array) {
  console.log(array);
  var result = [];
  for (var i = 0; i < array.rows.length; i++) {
    for (var key in array.rows[i]) {
      result.push(array.rows[i][key]);
    }
  }
  return result;
}

function parseGames(array) {
  let output = "";
  array.forEach(game => {
    output += game.name + "\n";
  });
  return output;
}

function parsePoints(array) {
  let output = "";
  array.forEach(player => {
    output += `${player.name} : ${player.points}\n`;
  });
  return output;
}

function parseArgs(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
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

  const r =
    Math.floor(Math.sin((Math.PI / CYCLE) * 2 * int) * SATURATION[0]) +
    BRIGHTNESS[0];
  const g =
    Math.floor(
      Math.sin((Math.PI / CYCLE) * 2 * int + (Math.PI * 2) / 3) * SATURATION[1]
    ) + BRIGHTNESS[1];
  const b =
    Math.floor(
      Math.sin((Math.PI / CYCLE) * 2 * int + (Math.PI * 4) / 3) * SATURATION[2]
    ) + BRIGHTNESS[2];
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
    botResponse(
      `${message.author.username} asked the ${command.name} command`,
      commandResponse,
      command.description,
      message.author.avatarURL
    )
  );
}

function minecraftResponse(message, uuid, name) {
  const embedColor = getNextColor(reqCount++);
  let response = new Discord.RichEmbed()
    .setColor(embedColor)
    .setTitle("Minecraft UUID")
    .setThumbnail(`https://crafatar.com/avatars/${uuid}?size=70`)
    .addField("User name :", name)
    .addField("UUID:", uuid)
    .setTimestamp(new Date());
  message.channel.send(response);
}

function movieResponse(message, body) {
  const embedColor = getNextColor(reqCount++);
  let response = new Discord.RichEmbed();
  for (var key in body) {
    if (
      key == "Ratings" ||
      key == "imdbVotes" ||
      key == "imdbID" ||
      key == "Type" ||
      key == "Response"
    ) {
      continue;
    }
    if (key == "Poster") {
      response.setThumbnail(body[key]);
      continue;
    }
    response.addField(key, body[key]);
  }
  response.setColor(embedColor);
  response.setTimestamp(new Date());
  message.channel.send(response);
}
function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}
function getCardinal(angle) {
  //easy to customize by changing the number of directions you have
  var directions = 8;

  var degree = 360 / directions;
  angle = angle + degree / 2;

  if (angle >= 0 * degree && angle < 1 * degree) return "N";
  if (angle >= 1 * degree && angle < 2 * degree) return "NE";
  if (angle >= 2 * degree && angle < 3 * degree) return "E";
  if (angle >= 3 * degree && angle < 4 * degree) return "SE";
  if (angle >= 4 * degree && angle < 5 * degree) return "S";
  if (angle >= 5 * degree && angle < 6 * degree) return "SW";
  if (angle >= 6 * degree && angle < 7 * degree) return "W";
  if (angle >= 7 * degree && angle < 8 * degree) return "NW";
  //Should never happen:
  return "N";
}
module.exports = {
  getCommand: getCommand,
  getArgs: getArgs,
  generateShitPost: generateShitPost,
  getNextColor: getNextColor,
  getRandomfromArray: getRandomfromArray,
  parseRows: parseRows,
  parseGames: parseGames,
  parsePoints: parsePoints,
  parseArgs: parseArgs,
  botResponse: botResponse,
  movieResponse: movieResponse,
  getCardinal: getCardinal,
  commandResponse: commandResponse,
  isNumber: isNumber,
  minecraftResponse: minecraftResponse
};
