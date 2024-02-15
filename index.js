// Importing required modules and setting up Express
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
const corsOptions = {
  origin: ["https://bistro-boss-303c5.web.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// "http://localhost:5173"

app.use(cors(corsOptions));
app.use(express.json());

// Connecting to MongoDB using the connectMongoDB function from connection.js
const { connectMongoDB } = require("./connection");

// Importing route handlers for different collections
const { authRouter } = require("./services/auth");
const bannersCollection = require("./routes/banners");
const menusRouter = require("./routes/menus");
const reviewsCollection = require("./routes/reviews");
const orderOnlineCollection = require("./routes/orderOnline");
const cartsCollection = require("./routes/carts");
const usersCollection = require("./routes/users");
const reservationCollection = require("./routes/reservation");
const stripeAPI = require("./routes/stripe");
const payHistoryCollection = require("./routes/payHistory");

// Connecting to MongoDB and setting up routes
connectMongoDB()
  .then((client) => {
    // Routes setup

    // Use the authentication router
    app.use("/jwt", authRouter);

    // Endpoint to get Banners for Landing page
    app.use("/banners", bannersCollection);

    // Endpoint to get all menus
    app.use("/menus", menusRouter);

    // Endpoint to get reviews data
    app.use("/reviews", reviewsCollection);

    // Endpoint to get orders-online landing page sections data
    app.use("/orders-online", orderOnlineCollection);

    // Endpoint to get all carts
    app.use("/carts", cartsCollection);

    // pay history
    app.use("/pay-history", payHistoryCollection);

    // stripe payment routers
    app.use("/api/create-checkout-session", stripeAPI);

    // EndPoint to get and post reservations data
    app.use("/reservation", reservationCollection);

    // post users details
    app.use("/users", usersCollection);

    // Send a ping to confirm a successful connection
    client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  })
  .catch((err) => {
    console.error("Error: " + err.message);
  });

// Default endpoint
app.get("/", (req, res) => {
  res.send("Boss is running");
});

// Starting the Express server
app.listen(port, () => {
  console.log(`Bistro Boss is listening on ${port}`);
});
