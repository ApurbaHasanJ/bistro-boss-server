const express = require("express");
const {
  handleGetPayHistory,
  handleAdminGetOrder,
  handleAdminGetOrderStats,
} = require("../controllers/payHistory");
const { verifyJWT, verifyAdmin } = require("../services/auth");
const router = express.Router();

router.get("/user/:email", handleGetPayHistory);
router.get("/admin", verifyJWT,verifyAdmin, handleAdminGetOrder);
router.get("/admin/order-stats",verifyJWT,verifyAdmin, handleAdminGetOrderStats);
module.exports = router;
