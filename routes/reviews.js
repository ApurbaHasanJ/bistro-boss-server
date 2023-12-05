const express = require("express");
const router = express.Router();
const reviewsCollection = require("../models/reviews");

router.get("/", async (req, res) => {
  const result = await reviewsCollection.find().toArray();
  res.send(result);
});

module.exports = router;
