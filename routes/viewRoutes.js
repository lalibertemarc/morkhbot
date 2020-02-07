const express = require("express");
const router = express.Router();
const Bot = require("../server.js").Bot;
const commandList = require("./../commandList.js").commandList;
const helpers = require("./../services/helperFunctions.js");

router.get("/help", (req, res, next) => {
  var commandResponse = [];

  for (var key in commandList) {
    var command = commandList[key];
    commandResponse.push(`${command.name}   : ${command.description}`);
  }
  res.render("help", {
    title: "Morkhbot",
    list: commandResponse
  });
});

router.get("/:view", (req, res, next) => {
  res.render(req.params.view, { title: "Morkhbot" });
});

module.exports = router;
