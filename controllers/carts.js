const { ObjectId } = require("mongodb");
const cartsCollection = require("../models/carts");

const handleGetUserCarts = async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.send("No cart information available", []);
  }
  const query = { userEmail: email };
  const result = await cartsCollection.find(query).toArray();
  res.send(result);
};

const handlePostUserCarts = async (req, res) => {
  const item = req.body;
  console.log(item);
  const result = await cartsCollection.insertOne(item);
  res.send(result);
};
 
const handleDeleteItem = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const query = {_id: new ObjectId(id)}
  const result = await cartsCollection.deleteOne(query);
  res.send(result);
}

module.exports = {
  handleGetUserCarts,
  handlePostUserCarts,
  handleDeleteItem
};
