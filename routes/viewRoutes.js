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

router.get("/points", (req, res, next) => {
  res.render("points", { title: "Morkhbot" });
});

router.get("/games", (req, res, next) => {
  res.render("games", { title: "Morkhbot" });
});

module.exports = router;
