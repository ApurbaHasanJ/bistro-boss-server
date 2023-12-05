const express = require("express");
const router = express.Router();
const bannersCollection = require("../models/banners");

router.get("/", async (req, res) => {
  const result = await bannersCollection.find().toArray();
  res.send(result);
});

module.exports = router;
