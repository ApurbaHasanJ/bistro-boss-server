const { client } = require("../connection");

const usersCollection = client.db("bistroBossDB").collection("users");
module.exports = usersCollection;
