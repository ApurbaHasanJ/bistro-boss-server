const express = require("express");
const { handleStripeAPI } = require("../services/stripe");
const router = express.Router();

router.post("/", handleStripeAPI);

module.exports = router;
