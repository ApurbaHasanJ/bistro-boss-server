const express = require("express");
const router = express.Router();
const { handlePostUsers, handleGetAdmin } = require("../controllers/users");
const { verifyJWT } = require("../services/auth");

router.post("/", handlePostUsers);
router.get("/admin/:email", verifyJWT, handleGetAdmin);

module.exports = router;
