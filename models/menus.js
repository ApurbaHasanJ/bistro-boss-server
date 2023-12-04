
const { client } = require("../connection");

const menusCollection = client.db("bistroBossDB").collection("menus");
module.exports = menusCollection;
