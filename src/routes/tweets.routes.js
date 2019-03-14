const express = require("express");

const router = express.Router();

router.get("/tweets", (req, res) => {
    res.json([{}]);
});

module.exports = router;