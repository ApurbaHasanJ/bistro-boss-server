const { client } = require("../connection");

const bannersCollection = client.db("bistroBossDB").collection("Banners");
module.exports = bannersCollection;
