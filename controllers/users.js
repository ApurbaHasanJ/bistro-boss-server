const { ObjectId } = require("mongodb");
const usersCollection = require("../models/users");

// handle post user data if it not exists
const handlePostUsers = async (req, res) => {
  const user = req.body;
  console.log(user);
  const filter = { email: user.email };
  const findUser = await usersCollection.findOne(filter);
  if (!findUser) {
    const result = await usersCollection.insertOne(user);
    res.send(result);
  } else {
    res.status(200).send({ message: "email already exists" });
  }
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

// get all users from
const handleGetAllUsers = async (req, res) => {
  const user = await usersCollection.find().toArray();
  res.send(user);
};

// update user role
const handleUpdateUserRole = async (req, res) => {
  const userId = req.params.id;
  const filter = { _id: new ObjectId(userId) };

  const user = await usersCollection.findOne(filter);

  let updatedRole;

  if (user.role === "admin") {
    updatedRole = "user";
  } else if (user.role === "user") {
    updatedRole = "admin";
  }

  const result = await usersCollection.updateOne(filter, {
    $set: { role: updatedRole },
  });
  // console.log(user);
  res.send(result);
};

// delete user from collection
const handleDeleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const filter = { _id: new ObjectId(userId) };
  const result = await usersCollection.deleteOne(filter);
  res.send(result);
};

module.exports = {
  handleGetAdmin,
  handleGetAllUsers,
  handleUpdateUserRole,
  handlePostUsers,
  handleDeleteUser,
};
