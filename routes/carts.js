const express = require("express");
const router = express.Router();
const {
  handleGetUserCarts,
  handlePostUserCarts,
  handleDeleteItem,
} = require("../controllers/carts");
const { verifyJWT, verifyAdmin } = require("../services/auth");

router.route("/").get(handleGetUserCarts).post(handlePostUserCarts);

router.delete("/:id",verifyJWT,verifyAdmin, handleDeleteItem);

module.exports = router;
