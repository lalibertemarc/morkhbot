const express = require("express");
const router = express.Router();
const Bot = require("../server.js").Bot;
const helpers = require("./../services/helperFunctions.js");
const mongoService = require("./../services/mongoDBservice.js");

router.get("/send/:channelId/:message", (req, res) => {
  let channelId = req.params.channelId;
  let message = req.params.message;
  let channel = Bot.channels.find("id", channelId);
  channel.send(helpers.botResponse("Morkh Bot is saying : ", message, "This is blood magic!"));
  res.send(`${message} was transmitted to the ${channel.name} channel`);
});

router.get("/:collection", async (req, res, next) => {
  try {
    let response = await mongoService.selectFromCollectionAsync(req.params.collection);
    res.send({ status: 200, payload: response });
  } catch (error) {
    res.send({ status: 500, message: error.message });
  }
});

router.post("/saveLocation", async (req, res, next) => {
  let locationName = req.body.nameInput;
  let xCoord = req.body.xInput;
  let yCoord = req.body.yInput;
  let zCoord = req.body.zInput;
  let isOverworld = req.body.dimension == "overworld";

  let location = {
    name: locationName,
    coords: { x: isOverworld ? xCoord : xCoord * 8, y: yCoord, z: isOverworld ? zCoord : zCoord * 8 }
  };
  try {
    let insertResponse = await mongoService.insertOneInCollectionAsync("minecraft", location);
    if (insertResponse.insertedCount == 1) res.redirect("../views/minecraft");
    else res.send(500);
  } catch (error) {
    res.send(500);
  }
});

module.exports = router;
