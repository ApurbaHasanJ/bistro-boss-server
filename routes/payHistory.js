const express = require("express");
const { handleGetPayHistory } = require("../controllers/payHistory");
const router = express.Router();

router.get("/user/:email", handleGetPayHistory);
module.exports = router;
