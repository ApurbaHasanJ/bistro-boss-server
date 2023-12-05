const express = require("express");
const router = express.Router();

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@believer.igrxpib.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectMongoDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (err) {
    console.error("Error connecting to MongoDB");
    throw err;
  }
};

module.exports = {
  router,
  client,
  connectMongoDB,
};
