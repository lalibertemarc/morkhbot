const Command = require("../models/Command");
const helpers = require("../services/helperFunctions");
const minecraftService = require("../services/minecraftService.js");

const getMinecraftUUID = new Command(
    "!mcUUID",
    "Get player UUID",
    async function (message, args) {
        let userName = args[0];
        console.log(userName);
        try {
            let UUID = await minecraftService.getUserUUID(userName);
            let officialName = await minecraftService.getOfficialName(userName);
            helpers.minecraftResponse(message, UUID, officialName);
        } catch (error) {
            helpers.commandResponse(message, this, error);
        }
    }
);

const minecraftNetherCoord = new Command(
    "!mcNetherCoords",
    "Get Nether Coordinates",
    function (message, args) {
        let coords = minecraftService.getNethercoord(+args[0], +args[1]);
        helpers.commandResponse(message, this, coords);
    }
);

const mcGetCoords = new Command(
    "!mcGetCoords",
    "Get all saved locations on Morkh's minecraft server",
    function (message, args) {
        helpers.commandResponse(
            message,
            this,
            `Visit http://${process.env.HOST}:${process.env.PORT}/views/minecraft to see all saved locations.`
        );
    }
);

let mcSaveCoords = new Command(
    "!mcSaveCoords",
    "Save a location from Morkh's Minecraft server.",
    async function (message, args) {
        let commandResponse = ` Visit http://${process.env.HOST}:${process.env.PORT}/views/minecraft to see all saved locations and save a new location.`;
        helpers.commandResponse(message, this, commandResponse);
    }
);

module.exports = {
    getMinecraftUUID: getMinecraftUUID,
    minecraftNetherCoord: minecraftNetherCoord,
    mcGetCoords: mcGetCoords,
    mcSaveCoords: mcSaveCoords,
};
