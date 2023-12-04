const express = require("express");
const reviewsCollection = require("../models/reviews");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await reviewsCollection.find().toArray();
  res.send(result);
});

module.exports = router;
