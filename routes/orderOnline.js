const express = require("express");
const router = express.Router();
const orderOnlineCollection = require("../models/orderOnline");

router.get("/", async (req, res) => {
  const result = await orderOnlineCollection.find().toArray();
  res.send(result);
});

module.exports = router;
