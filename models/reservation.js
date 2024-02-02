const { client } = require("../connection");

const reservationCollection = client.db("bistroBossDB").collection("reservation");
module.exports = reservationCollection;
