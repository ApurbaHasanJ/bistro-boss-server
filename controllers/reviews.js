const reviewCollection = require("../models/reviews");

const handlePostUserReview = async (req, res) => {
  const review = req.body.review;
  //   console.log("review",review);

  const result = await reviewCollection.insertOne(review);
  res.send(result);
};

module.exports = {
  handlePostUserReview,
};
