const express = require("express");
const {
  handlePostReservation,
  handleGetUserReservations,
  handleGetAllReservations,
  handleUpdateReservationActivity,
} = require("../controllers/reservation");
const router = express.Router();

router.post("/user", handlePostReservation);
router.get("/admin", handleGetAllReservations);
router.get("/user/:email", handleGetUserReservations);
router.patch("/admin/:id", handleUpdateReservationActivity);

module.exports = router;
