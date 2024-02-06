const express = require("express");
const router = express.Router();
const { handleGetOrders } = require("../controllers/orderOnline");
const { verifyJWT } = require("../services/auth");

router.get("/", handleGetOrders)

module.exports = router;
