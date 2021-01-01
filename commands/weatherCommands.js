const Command = require("../models/Command");
const helpers = require("../services/helperFunctions");
const webResquestHelper = require("../services/webRequesterHelper.js");

const weather = new Command(
    "!weather",
    "Will give the current weather for the asked city",
    async function (message, args) {
        var city = args[0];
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3a91dafd0698ffa38eb48d03f29b9d0c`;

        try {
            let weatherResponse = await webResquestHelper.getAsync(url, 3000, {
                json: true,
            });
            let body = weatherResponse.data;
            var commandResponse = "";
            commandResponse += `Weather for ${body.name}: \n`;
            commandResponse += `Currently : ${body.weather[0].description}\n`;
            commandResponse += `Temp : ${body.main.temp} °C\n`;
            commandResponse += `Min : ${body.main.temp_min} °C\n`;
            commandResponse += `Max : ${body.main.temp_max} °C\n`;
            commandResponse += `Wind : ${
                body.wind.speed * 3.6
            } km/h to ${helpers.getCardinal(body.wind.deg)}`;
            if (body.rain) commandResponse += `Rain : ${body.rain["3h"]}\n`;

            helpers.commandResponse(message, this, commandResponse);
        } catch (error) {
            helpers.commandResponse(message, this, error);
        }
    }
);

module.exports = {
    weather: weather,
};
