const express = require("express");
const router = express.Router();
const {
  handleGetUserCarts,
  handlePostUserCarts,
  handleDeleteItem,
} = require("../controllers/carts");

router.route("/").get(handleGetUserCarts).post(handlePostUserCarts);

router.delete("/:id", handleDeleteItem);

module.exports = router;
