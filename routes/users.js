const express = require("express");
const router = express.Router();
const {
  handlePostUsers,
  handleGetAdmin,
  handleGetAllUsers,
  handleUpdateUserRole,
  handleDeleteUser,
} = require("../controllers/users");
const { verifyJWT, verifyAdmin } = require("../services/auth");

router.post("/", handlePostUsers);
router.get("/admin", verifyJWT, verifyAdmin, handleGetAllUsers);
router
  .route("/admin/:id", verifyJWT, verifyAdmin)
  .patch(handleUpdateUserRole)
  .delete(handleDeleteUser);
router.get("/admin/:email", verifyJWT, handleGetAdmin);

module.exports = router;
