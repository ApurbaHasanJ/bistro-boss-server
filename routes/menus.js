const express = require("express");
const menusCollection = require("../models/menus");
const router = express.Router();

// get menus data
router.get("/", async (req, res) => {
  const result = await menusCollection.find().toArray();
  res.send(result);
});

module.exports = router;