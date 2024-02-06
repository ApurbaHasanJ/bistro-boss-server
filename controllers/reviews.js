const reviewCollection = require("../models/reviews");

const handlePostUserReview = async (req, res) => {
  const review = req.body.review;

  const result = await reviewCollection.insertOne(review);
  res.send(result);
};

const handleGetUserReview = async (req, res) => {
  const userEmail = req.params.email;
  const filter = { user: userEmail };
  const result = await reviewCollection.find(filter).toArray();
  res.send(result);
};

module.exports = {
  handlePostUserReview,
  handleGetUserReview
};
