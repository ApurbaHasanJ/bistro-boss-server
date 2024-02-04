const moment = require("moment");
const reservationCollection = require("../models/reservation");

const handlePostReservation = async (req, res) => {
  try {
    const reservation = req.body;
    console.log(reservation);
    reservation.time = moment(reservation.time, "HH:mm").format("hh:mm A");

    // Insert the reservation into the collection
    const result = await reservationCollection.insertOne(reservation);

    console.log(result);

   res.send(result)
  } catch (error) {
    console.error("Error adding reservation:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  handlePostReservation,
};
