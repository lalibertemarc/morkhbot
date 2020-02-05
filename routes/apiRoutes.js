const express = require("express");
const router = express.Router();
const Bot = require("../server.js").Bot;
const helpers = require("./../services/helperFunctions.js");
const mongoService = require("./../services/mongoDBservice.js");

router.get("/send/:channelId/:message", (req, res) => {
  let channelId = req.params.channelId;
  let message = req.params.message;
  let channel = Bot.channels.find("id", channelId);
  channel.send(
    helpers.botResponse(
      "Morkh Bot is saying : ",
      message,
      "This is blood magic!"
    )
  );
  res.send(`${message} was transmitted to the ${channel.name} channel`);
});

router.get("/points", async (req, res, next) => {
  try {
    let response = await mongoService.selectFromCollectionAsync("points");
    res.send({ status: 200, payload: response });
  } catch (error) {
    res.send({ status: 500, message: error.message });
  }
});

router.get("/games", async (req, res, next) => {
  try {
    let response = await mongoService.selectFromCollectionAsync("games");
    res.send({ status: 200, payload: response });
  } catch (error) {
    res.send({ status: 500, message: error.message });
  }
});

module.exports = router;
