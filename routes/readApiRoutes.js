const express = require("express");
const mongoService = require("./../services/mongoDBservice.js");
const router = express.Router();

router.get("/:collection", async (req, res, next) => {
    try {
        let response = await mongoService.selectFromCollectionAsync(req.params.collection, req.query);
        res.send({ status: 200, payload: response });
    } catch (error) {
        res.send({ status: 500, message: error.message });
    }
});

module.exports = router;
