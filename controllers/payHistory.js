const payHistoryCollection = require("../models/payHistory");

const handleAdminGetOrder = async (req, res) => {
  try {
    // Sorting by createdAt field in descending order (latest orders first)
    const result = await payHistoryCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.send(result);
  } catch (error) {
    console.error("Error in handleGetOrder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGetPayHistory = async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);

    const result = await payHistoryCollection.find({ userEmail: email }).toArray();

    if (result) {
      console.log(result);
      res.status(200).json(result); // Send the result back to the client
    } else {
      console.log("No payment history found for the user");
      res.status(404).json({ error: "No payment history found for the user" });
    }
  } catch (error) {
    console.error("Error retrieving payment history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleGetPayHistory,
};
