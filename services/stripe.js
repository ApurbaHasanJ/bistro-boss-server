const stripe = require("stripe")(`${process.env.PAYMENT_SECRET_KEY}`);
const express = require("express");
const payHistoryCollection = require("../models/payHistory");
const cartsCollection = require("../models/carts");
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
  const allPrices = items.map((item) => parseFloat(item.price));

  // Calculate the sum of all prices
  const totalPrice = allPrices.reduce((acc, price) => acc + price, 0);

  // Round the total price to two decimal places and parse it to a float
  const formattedTotalPrice = parseFloat(totalPrice.toFixed(2));

  // Create the orderHistory object
  const orderHistory = {
    userName: userName,
    userEmail: userEmail,
    menuIds: allMenuIds,
    totalPrice: formattedTotalPrice,
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
    success_url: `https://bistro-boss-303c5.web.app/payment-success`,
    cancel_url: `https://bistro-boss-303c5.web.app/payment-error`,
  });

  // Post order if payment is successful
  await payHistoryCollection.insertOne(orderHistory);

  // Delete cart items
  const filter = { userEmail: userEmail };
  await cartsCollection.deleteMany(filter);

  res.json({ id: session.id });
};

module.exports = {
  handleStripeAPI,
};
