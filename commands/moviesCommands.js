const Command = require("../models/Command");
const helpers = require("../services/helperFunctions");
const webResquestHelper = require("../services/webRequesterHelper.js");

const movies = new Command(
    "!movies",
    "Will query OMDb api for a movie request",
    async (message, args) => {
        let title = args.join(" ");
        var url = `http://www.omdbapi.com/?t=${title}&apikey=f7ee9808`;

        try {
            let movieRequest = await webResquestHelper.getAsync(url, 3000, {
                json: true,
            });

            let body = movieRequest.data;
            if (body.Response) helpers.movieResponse(message, body);
            else helpers.commandResponse(message, this, body.Error);
        } catch (exception) {
            helpers.commandResponse(message, this, exception);
        }
    }
);

module.exports = {
    movies: movies,
};
