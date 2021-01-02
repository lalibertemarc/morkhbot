var duelData = {
    armed: false,
    initiator: "",
    target: "",
    initiatorRoll: 0,
    targetRoll: 0,
    typeRoll: "",
};
var launcher = require("./dicelauncher.js");

function initiateDuel(initiatorName, targetName) {
    if (typeof initiatorName != "string" || typeof targetName != "string")
        return;
    if (initiatorName == targetName) {
        return "You have won over yourself, congratz!";
    }
    duelData["initiator"] = initiatorName;
    duelData["target"] = targetName;

    return `${targetName} you have been challenge in a duel by ${initiatorName}.
Type !acceptDuel if you accept or !refuseDuel if you're too affraid.`;
}

function acceptDuel(targetName) {
    if (duelData["armed"] == false) return "There is no duel right now.";
    if (targetName == duelData["target"]) duelData["armed"] = true;
    return `Duel is starting, in 3-2-1 GO!
Type !duelRoll <typeRoll>, like !duelRoll 1d20 or whatever.`;
}

function refuseDuel() {
    if (duelData["armed"] == false) return "There is no duel right now.";
    else {
        clearDuelData();
        return "Duel is ready to be initiated again";
    }
}

function clearDuelData() {
    duelData["armed"] = false;
    duelData["initiator"] = "";
    duelData["target"] = "";
    duelData["initiatorRoll"] = 0;
    duelData["targetRoll"] = 0;
    duelData["typeRoll"] = "";
}

function duelRoll(name, d) {
    if (duelData["armed"] == false)
        return "You are not being dueled right now.";
    if (duelData["typeRoll"] == "") {
        duelData["typeRoll"] = d;
    }
    if (duelData["typeRoll"] != "" && duelData["typeRoll"] != d) {
        return (
            "Please use the same typeRoll of " +
            duelData["typeRoll"] +
            " so we have a fair duel."
        );
    }
    roll = launcher.launcherNoText(d);
    rollCheck(name, roll);
    return name + " has rolled a " + roll + ".";
}

function rollCheck(rollerName, roll) {
    if (duelData["armed"] == false) return;
    if (rollerName == duelData["initiator"]) {
        duelData["initiatorRoll"] = roll;
    } else if (rollerName == duelData["target"]) {
        duelData["targetRoll"] = roll;
    }
}

function endDuel() {
    if (duelData["armed"] == false) return "There is no duel right now.";
    if (duelData["initiatorRoll"] > duelData["targetRoll"]) {
        return (
            duelData["initiator"] +
            " wins the duel over " +
            duelData["target"] +
            " with a roll of " +
            duelData["initiatorRoll"] +
            " over " +
            duelData["targetRoll"] +
            "."
        );
    }
    if (duelData["initiatorRoll"] < duelData["targetRoll"]) {
        return (
            duelData["target"] +
            " wins the duel over " +
            duelData["initiator"] +
            " with a roll of " +
            duelData["targetRoll"] +
            " over " +
            duelData["initiatorRoll"] +
            "."
        );
    }
    if (duelData["initiatorRoll"] == duelData["targetRoll"]) {
        return "It's a tie! No one wins";
    }
}

module.exports = {
    duelRoll: duelRoll,
    initiateDuel: initiateDuel,
    acceptDuel: acceptDuel,
    clearDuelData: clearDuelData,
    endDuel: endDuel,
    refuseDuel: refuseDuel,
};
