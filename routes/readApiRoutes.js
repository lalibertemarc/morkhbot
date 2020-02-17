const express = require("express");
const mongoService = require("./../services/mongoDBservice.js");
const router = express.Router();

router.get("/:collection", async (req, res, next) => {
    try {
        let response = await mongoService.selectFromCollectionAsync(req.params.collection, req.query);
        if (response.length != 0) res.send({ status: 200, payload: response });
        else res.send({ status: 402, message: "Item does not exist in database" });
    } catch (error) {
        res.send({ status: 500, message: error.message });
    }
});

module.exports = router;
