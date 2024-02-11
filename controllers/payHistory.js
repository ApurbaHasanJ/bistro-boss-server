const payHistoryCollection = require("../models/payHistory");

// get the payHistory by admin
const handleAdminGetOrder = async (req, res) => {
  try {
    // Sorting by createdAt field in descending order (latest orders first)
    const result = await payHistoryCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.send(result);
  } catch (error) {
    // console.error("Error in handleGetOrder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get pay history by user
const handleGetPayHistory = async (req, res) => {
  try {
    const email = req.params.email;
    // console.log(email);

    const result = await payHistoryCollection
      .find({ userEmail: email })
      .toArray();

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

// get order stats by admin
const handleAdminGetOrderStats = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "menus",
          let: { menuIds: "$menuIds" },
          pipeline: [
            {
              $match: {
                $expr: { $in: [{ $toString: "$_id" }, "$$menuIds"] },
              },
            },
          ],
          as: "menuItems",
        },
      },
      {
        $unwind: "$menuItems",
      },
      {
        $group: {
          _id: "$menuItems.category",
          count: { $sum: 1 },
          total: { $sum: "$menuItems.price" },
        },
      },
      {
        $project: {
          category: "$_id", // Rename _id to category
          count: 1,
          total: { $round: ["$total", 2] },
        },
      },
    ];

    const result = await payHistoryCollection.aggregate(pipeline).toArray();
    // console.log("order price with category", result);
    res.send(result);
  } catch (error) {
    console.error("Error fetching order stats:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  handleGetPayHistory,
  handleAdminGetOrder,
  handleAdminGetOrderStats,
};
