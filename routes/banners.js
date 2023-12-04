const express = require("express");
const bannersCollection = require("../models/banners");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await bannersCollection.find().toArray();
  res.send(result);
});

module.exports = router;
