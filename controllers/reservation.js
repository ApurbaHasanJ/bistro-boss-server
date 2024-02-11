const moment = require("moment");
const reservationCollection = require("../models/reservation");
const { ObjectId } = require("mongodb");

// post user reservation
const handlePostReservation = async (req, res) => {
  try {
    const reservation = req.body;
    console.log(reservation);
    reservation.time = moment(reservation.time, "HH:mm").format("hh:mm A");

    // Insert the reservation into the collection
    const result = await reservationCollection.insertOne(reservation);

    console.log(result);

    res.send(result);
  } catch (error) {
    console.error("Error adding reservation:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// get specific user reservations based on user email
const handleGetUserReservations = async (req, res) => {
  // console.log(req);
  try {
    const userEmail = req.params.email;
    // console.log(userEmail);

    const filter = { email: userEmail };
    const result = await reservationCollection.find(filter).toArray();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

// get all reservation by admin
const handleGetAllReservations = async (req, res) => {
  const result = await reservationCollection
    .find()
    .sort({ date: -1 })
    .toArray();
  res.send(result);
};

const handleUpdateReservationActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const reservation = await reservationCollection.findOne(filter);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    let updatedActivity;
    if (!reservation.activity || reservation.activity === "pending") {
      updatedActivity = "completed";
    } else if (reservation.activity === "completed") {
      updatedActivity = "pending";
    }

    const result = await reservationCollection.updateOne(filter, {
      $set: { activity: updatedActivity },
    });

    res.json(result);
  } catch (error) {
    console.error("Error updating reservation activity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handlePostReservation,
  handleGetUserReservations,
  handleGetAllReservations,
  handleUpdateReservationActivity,
};
