const express = require("express");
const router = express.Router();
const { handleOrderOnline } = require("../controllers/orderOnline");
const { verifyJWT } = require("../services/auth");

router.get("/", handleOrderOnline)

module.exports = router;
