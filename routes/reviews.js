const express = require("express");
const { handlePostUserReview } = require("../controllers/reviews");
const router = express.Router();

router.post("/", handlePostUserReview);

module.exports = router;
