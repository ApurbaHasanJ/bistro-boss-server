const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// collections
const {connectMongoDB} = require("./connection");

const bannersCollection = require("./routes/banners");
const menusRouter = require("./routes/menus");
const reviewsCollection = require("./routes/reviews");
const orderOnlineCollection = require("./routes/orderOnline");

connectMongoDB()
  .then((client) => {
    // Routes
    // get Banners for Landing page
    app.use("/banners", bannersCollection);

    // get all menus
    app.use("/menus", menusRouter);

    // get reviews data
    app.use("/reviews", reviewsCollection);

    // get orders-online landing page sections data
    app.use("/orders-online", orderOnlineCollection);
    // Send a ping to confirm a successful connection
    client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  })
  .catch((err) => {
    console.error("Error: " + err.message);
  });

app.get("/", (req, res) => {
  res.send("Boss is running");
});

app.listen(port, () => {
  console.log(`Bistro Boss is listening on ${port}`);
});
