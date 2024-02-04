const orderOnlineCollection = require("../models/orderOnline");

const handleOrderOnline = async (req, res) => {
  try {
    // Sorting by createdAt field in descending order (latest orders first)
    const result = await orderOnlineCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.error("Error in handleGetOrder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleOrderOnline,
};
