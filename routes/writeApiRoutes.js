const express = require("express");
const mongoService = require("./../services/mongoDBservice.js");
const router = express.Router();

//used to insert games or new user
router.put("/:collection", async (req, res, next) => {
    let item = req.body;
    let collection = req.params.collection;
    try {
        let existsResponse = await mongoService.selectFromCollectionAsync(collection, { name: item.name });
        if (existsResponse.length == 0) {
            let insertResponse = await mongoService.insertOneInCollectionAsync(collection, item);
            if (insertResponse.insertedCount == 1) res.sendStatus(200);
            else res.send({ status: 501, message: "Item was not inserted for some reasons, please retry" });
        } else {
            res.send({ status: 401, message: "Item is already in database, maybe use patch request instead." });
        }
    } catch (error) {
        res.send({ status: 500, message: "Unexpected error, please retry" });
    }
});

router.patch("/points", async (req, res, next) => {
    let item = req.body;
    let user = item.name;
    let points = +item.points;
    try {
        let existsResponse = await mongoService.selectFromCollectionAsync("points", { name: user });
        if (existsResponse.length == 0) {
            res.send({ status: 402, message: "Item does not exist in database" });
        } else {
            let pointResponse = await mongoService.selectFromCollectionAsync("points", { name: user });
            let pointsToUpdate = +pointResponse[0].points + points;
            let updateResponse = await mongoService.replaceOneFromCollectionAsync(
                "points",
                { name: user },
                { name: user, points: pointsToUpdate }
            );
            if (updateResponse.modifiedCount == 1)
                res.send({ status: 200, payload: `${user} has now ${pointsToUpdate} points.` });
            else commandResponse = res.sendStatus(500);
        }
    } catch (error) {
        res.send({ status: 500, message: "Unexpected error, please retry" });
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
        else res.sendStatus(500);
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;
