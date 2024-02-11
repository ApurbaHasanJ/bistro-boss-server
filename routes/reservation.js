const express = require("express");
const {
  handlePostReservation,
  handleGetUserReservations,
  handleGetAllReservations,
  handleUpdateReservationActivity,
} = require("../controllers/reservation");
const { verifyJWT, verifyAdmin } = require("../services/auth");
const router = express.Router();

router.post("/user", handlePostReservation);
router.get("/admin",verifyJWT,verifyAdmin, handleGetAllReservations);
router.get("/user/:email", handleGetUserReservations);
router.patch("/admin/:id",verifyJWT,verifyAdmin, handleUpdateReservationActivity);

module.exports = router;
