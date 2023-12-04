const { client } = require("../connection");

const orderOnlineCollection = client
  .db("bistroBossDB")
  .collection("orderOnline");

module.exports = orderOnlineCollection;
