const { ObjectId } = require("mongodb");
const menusCollection = require("../models/menus");

const handleGetAllMenus = async (req, res) => {
  const result = await menusCollection.find().toArray();
  res.send(result);
};

// post new menus by admin
const handlePostMenu = async (req, res) => {
  const menu = req.body;
  console.log(menu);

  const result = await menusCollection.insertOne(menu);
  res.send(result);
};

// delete menu by admin
const handleDeleteMenu = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await menusCollection.deleteOne(filter);
  console.log(result);
  res.send(result);
};

// update menu data by admin
const handleUpdateMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const menu = req.body;
    console.log(id);
    console.log(menu);

    const filter = { _id: new ObjectId(id) };

    const result = await menusCollection.updateOne(filter, { $set: menu });
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).send("Error updating menu");
  }
};

module.exports = {
  handleGetAllMenus,
  handlePostMenu,
  handleDeleteMenu,
  handleUpdateMenu,
};
