const usersCollection = require("../models/users");

const handlePostUsers = async (req, res) => {
  const user = req.body;
  const result = await usersCollection.insertOne(user);
  res.send(result);
};

// get admin from users collection
const handleGetAdmin = async (req, res) => {
  const email = req.params.email;

  if (req.decoded.email !== email) {
    res.send({ admin: false });
    return;
  }

  const query = { email: email };
  const user = await usersCollection.findOne(query);
  const result = { admin: user?.role === "admin" };
  res.send(result);
};

module.exports = {
  handleGetAdmin,
  handlePostUsers,
};
