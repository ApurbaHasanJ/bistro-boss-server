const express = require("express");
const orderOnlineCollection = require("../models/orderOnline");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await orderOnlineCollection.find().toArray();
  res.send(result);
});

module.exports = router;
