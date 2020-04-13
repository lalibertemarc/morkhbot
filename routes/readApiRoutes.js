const express = require("express");
const mongoService = require("./../services/mongoDBservice.js");
const router = express.Router();
const Status = require(".././models/Status.js");

router.get("/:collection", async (req, res, next) => {
    try {
        let response = await mongoService.selectFromCollectionAsync(req.params.collection, req.query);
        if (response.length != 0) res.status(Status.OK).send(response);
        else res.status(Status.DOES_NOT_EXIST).send("Item does not exist in database");
    } catch (error) {
        res.status(Status.CATCHED_ERROR).send(error.message);
    }
});

module.exports = router;
