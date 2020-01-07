const webResquestHelper = require("./webRequesterHelper.js");

let userUrl = "https://api.mojang.com/users/profiles/minecraft/";
let skinUrl = "https://sessionserver.mojang.com/session/minecraft/profile/";

async function getUserUUID(userName) {
    let url = `${userUrl}${userName}`;
    let request;
    try {
        request = await webResquestHelper.getAsync(url, 3000, { JSON: true });
        console.log(request.data.id);
        return request.data.id;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getOfficialName(userName) {
    let url = `${userUrl}${userName}`;

    let request;
    try {
        request = await webResquestHelper.getAsync(url, 3000, { JSON: true });
        return request.data.name;
    } catch (error) {
        return error;
    }
}

async function getUserSkinURL(uuid) {
    let url = `${skinUrl}${uuid}`;
    let request;
    try {
        request = await webResquestHelper.getAsync(url, 3000, { JSON: true });
        return convertBase64(request.data.properties[0].value);
    } catch (error) {
        return error;
    }
}

function convertBase64(data) {
    let text = Buffer.from(data, "base64").toString();
    let object = JSON.parse(text);
    return object.textures.SKIN.url;
}

module.exports = {
    getUserUUID: getUserUUID,
    getUserSkinURL: getUserSkinURL,
    getOfficialName: getOfficialName
};
