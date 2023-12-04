const { client } = require("../connection");

const reviewCollection = client.db("bistroBossDB").collection("reviews");
module.exports = reviewCollection;
