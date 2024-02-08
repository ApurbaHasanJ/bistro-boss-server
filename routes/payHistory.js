const express = require("express");
const {
  handleGetPayHistory,
  handleAdminGetOrder,
  handleAdminGetOrderStats,
} = require("../controllers/payHistory");
const router = express.Router();

router.get("/user/:email", handleGetPayHistory);
router.get("/admin", handleAdminGetOrder);
router.get("/admin/order-stats", handleAdminGetOrderStats);
module.exports = router;
