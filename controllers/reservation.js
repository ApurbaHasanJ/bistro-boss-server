const moment = require("moment");
const reservationCollection = require("../models/reservation");

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

module.exports = {
  handlePostReservation,
  handleGetUserReservations,
};
