const express = require("express");
const { handlePostUserReview, handleGetUserReview } = require("../controllers/reviews");
const router = express.Router();

router.post("/", handlePostUserReview);
router.get("/user/:email", handleGetUserReview)

module.exports = router;
