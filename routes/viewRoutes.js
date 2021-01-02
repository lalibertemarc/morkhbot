const express = require("express");
const router = express.Router();
const commandList = require("./../commandList.js").commandList;

router.get("/help", (req, res, next) => {
    var commandResponse = [];

    for (var key in commandList) {
        var command = commandList[key];
        commandResponse.push(`${command.name}   : ${command.description}`);
    }
    res.render("help", {
        title: "Morkhbot",
        list: commandResponse,
    });
});

router.get("/:view", (req, res, next) => {
    res.render(req.params.view, { title: "Morkhbot" });
});

module.exports = router;
