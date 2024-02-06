const express = require("express");
const router = express.Router();
const {
  handlePostUsers,
  handleGetAdmin,
  handleGetAllUsers,
  handleUpdateUserRole,
  handleDeleteUser,
} = require("../controllers/users");
const { verifyJWT } = require("../services/auth");

router.post("/", handlePostUsers);
router.get("/admin", handleGetAllUsers);
router.route("/admin/:id").patch(handleUpdateUserRole).delete(handleDeleteUser);
router.get("/admin/:email", verifyJWT, handleGetAdmin);

module.exports = router;
