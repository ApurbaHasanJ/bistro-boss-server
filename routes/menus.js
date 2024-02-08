const express = require("express");
const router = express.Router();
const {
  handleGetAllMenus,
  handlePostMenu,
  handleDeleteMenu,
  handleUpdateMenu,
} = require("../controllers/menus");

// get menus data
router.get("/", handleGetAllMenus);
router.post("/admin", handlePostMenu);
router.route("/admin/:id").delete(handleDeleteMenu).patch(handleUpdateMenu);

module.exports = router;
