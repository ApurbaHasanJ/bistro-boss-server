const { client } = require("../connection");

const cartsCollection = client.db("bistroBossDB").collection("carts");
module.exports = cartsCollection;
