const express = require("express");
const mongoService = require("./../services/mongoDBservice.js");
const router = express.Router();
const Status = require(".././models/Status.js");
const ResponseMessage = require(".././models/ResponseMessage.js");
const ResponsePayload = require(".././models/ResponsePayload.js");

router.get("/:collection", async (req, res, next) => {
    try {
        let response = await mongoService.selectFromCollectionAsync(req.params.collection, req.query);
        if (response.length != 0) res.send(new ResponsePayload(Status.OK, response));
        else res.send(new ResponseMessage(Status.DOES_NOT_EXIST, "Item does not exist in database"));
    } catch (error) {
        res.send(new ResponseMessage(Status.CATCHED_ERROR, error.message));
    }
});

module.exports = router;
