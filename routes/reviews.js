const express = require("express");
const { handlePostUserReview, handleGetUserReview, handleGetAllReviews } = require("../controllers/reviews");
const router = express.Router();

router.route("/").post(handlePostUserReview).get(handleGetAllReviews)
router.get("/user/:email", handleGetUserReview)

module.exports = router;
