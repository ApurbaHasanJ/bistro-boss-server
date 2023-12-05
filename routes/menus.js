const express = require("express");
const router = express.Router();
const menusCollection = require("../models/menus");

// get menus data
router.get("/", async (req, res) => {
  const result = await menusCollection.find().toArray();
  res.send(result);
});

module.exports = router;
