const express = require("express");
const mongoService = require("./../services/mongoDBservice.js");
const router = express.Router();
const Status = require(".././models/Status.js");
const ResponseMessage = require(".././models/ResponseMessage.js");

//used to insert games or new user
router.put("/:collection", async (req, res, next) => {
    let item = req.body;
    let collection = req.params.collection;
    try {
        let existsResponse = await mongoService.selectFromCollectionAsync(collection, { name: item.name });
        if (existsResponse.length == 0) {
            let insertResponse = await mongoService.insertOneInCollectionAsync(collection, item);
            if (insertResponse.insertedCount == 1)
                res.send(new ResponseMessage(Status.OK, `${item.name} was correctly inserted in DB.`));
            else
                res.send(
                    new ResponseMessage(Status.UNKOWN_REASON, "Item was not inserted for some reasons, please retry")
                );
        } else {
            res.send(new ResponseMessage(Status.ALREADY_IN_DB, "Item is already in database."));
        }
    } catch (error) {
        res.send(new ResponseMessage(Status.CATCHED_ERROR, error.message));
    }
});

router.patch("/points", async (req, res, next) => {
    let item = req.body;
    let user = item.name;
    let points = +item.points;
    try {
        let existsResponse = await mongoService.selectFromCollectionAsync("points", { name: user });
        if (existsResponse.length == 0) {
            res.send(new ResponseMessage(Status.DOES_NOT_EXIST, "Item does not exist in database"));
        } else {
            let pointResponse = await mongoService.selectFromCollectionAsync("points", { name: user });
            let pointsToUpdate = +pointResponse[0].points + points;
            let updateResponse = await mongoService.replaceOneFromCollectionAsync(
                "points",
                { name: user },
                { name: user, points: pointsToUpdate }
            );
            if (updateResponse.modifiedCount == 1)
                res.send(new ResponseMessage(Status.OK, `${user} has now ${pointsToUpdate} points.`));
            else
                commandResponse = res.sendStatus(
                    new ResponseMessage(Status.UNKOWN_REASON, "There was an error when modifying points.")
                );
        }
    } catch (error) {
        res.send(new ResponseMessage(Status.CATCHED_ERROR, error.message));
    }
});

router.delete("/:collection", async (req, res, next) => {
    let item = req.body;
    let collection = req.params.collection;

    try {
        let deleteResponse = await mongoService.deleteOneFromCollectionAsync(collection, item);
        if (deleteResponse.deletedCount == 1)
            res.send(new ResponseMessage(Status.OK, `${item.name} was correctly deleted from DB`));
        else res.send(new ResponseMessage(Status.UNKOWN_REASON, `There was an error in deletion, please retry.`));
    } catch (error) {
        res.send(new ResponseMessage(Status.CATCHED_ERROR, error.message));
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
        //TODO:change redirect for actual api response
        if (insertResponse.insertedCount == 1) res.redirect("../views/minecraft");
        else res.sendStatus(new ResponseMessage(Status.UNKOWN_REASON, "There was an error when saving location"));
    } catch (error) {
        res.send(new ResponseMessage(Status.CATCHED_ERROR, error.message));
    }
});

module.exports = router;
