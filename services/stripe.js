const stripe = require("stripe")(
  "sk_test_51OewvnFpHUUs9w8UE8KihRF261XmMHjjKtFImjzZMXrgbPK6gSghJXdUhF1x3zRAWO62CgU6B223NLFm9uUh9NVU00cf6y6xTQ"
);
const express = require("express");
const payHistoryCollection = require("../models/payHistory");
const cartsCollection = require("../models/carts");
const { ObjectId } = require("mongodb");
const app = express();
app.use(express.static("public"));

const handleStripeAPI = async (req, res) => {
  const { items } = req.body;
  console.log(req.body);

  // Extract the first user's name and email
  const userName = items[0]?.userName;
  const userEmail = items[0]?.userEmail;

  // Extract all menuId values
  const allMenuIds = items.map((item) => item.menuId);
  const allPrices = items.map((item) => item.price);

  // Calculate the sum of all prices
  const totalPrice = allPrices.reduce((acc, price) => acc + price, 0);

  // Create the orderHistory object
  const orderHistory = {
    userName: userName,
    userEmail: userEmail,
    menuIds: allMenuIds,
    totalPrice,
    createdAt: new Date(),
  };

  // get all menu items
  const menuItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    // add payment method type
    payment_method_types: ["card"],

    line_items: menuItems,
    mode: "payment",
    success_url: `http://localhost:5173/payment-success`,
    cancel_url: `http://localhost:5173/payment-error`,
  });

  //   post order if payment is successful
  await payHistoryCollection.insertOne(orderHistory);
  const filter = { userEmail: userEmail };
  await cartsCollection.deleteMany(filter)

  res.json({ id: session.id });
};

module.exports = {
  handleStripeAPI,
};
