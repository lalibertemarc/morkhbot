const webResquestHelper = require("./webRequesterHelper");
const helpers = require("./helperFunctions");

async function addUser(userName, points) {
    try {
        let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.WRITE_API}/points`;
        let response = await webResquestHelper.putAsync(url, {
            name: userName,
            points: points,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return "Unexpected Error in my points, please retry";
    }
}

async function getPointsForUser(userName) {
    try {
        let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.READ_API}/points?name=${userName}`;
        let response = await webResquestHelper.getAsync(url);
        if (response.status == 200) {
            let currentPoints = response.data[0].points;
            return `${userName} has ${
                currentPoints > 1
                    ? currentPoints + " points"
                    : currentPoints + " point"
            } .`;
        } else if (response.status == 402) {
            return await addUser(userName, 0);
        }
    } catch (error) {
        console.error(error);
        return "Unexpected Error in my points, please retry";
    }
}

async function getPointsForAllUsers() {
    try {
        let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.READ_API}/points?`;
        let response = await webResquestHelper.getAsync(url);
        if (response.status == 200) return helpers.parsePoints(response.data);
        else return response.data.message;
    } catch (error) {
        console.error(error);
        return "Unexpected Error, please retry";
    }
}

async function giveUserSomePoint(user, points) {
    try {
        let url = `http://${process.env.HOST}:${process.env.PORT}/${process.env.WRITE_API}/points`;

        let response = await webResquestHelper.patchAsync(url, {
            name: user,
            points: points,
        });
        if (response.status == 200) {
            return response.data;
        } else if (response.status == 402) return await addUser(user, points);
    } catch (error) {
        console.error(error);
        return "Unexpected Error, please retry";
    }
}

module.exports = {
    addUser: addUser,
    getPointsForUser: getPointsForUser,
    getPointsForAllUsers: getPointsForAllUsers,
    giveUserSomePoint: giveUserSomePoint,
};
