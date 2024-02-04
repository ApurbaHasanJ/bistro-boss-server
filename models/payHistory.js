const { client } = require("../connection");

const payHistoryCollection = client
  .db("bistroBossDB")
  .collection("payHistory");

module.exports = payHistoryCollection;
