const express = require("express");
const router = express.Router();
const handlePostUsers = require("../controllers/users");

router.post("/", handlePostUsers);

module.exports = router;
