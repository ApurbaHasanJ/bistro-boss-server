const reservationCollection = require("../models/reservation");

const handlePostReservation = async (req, res) => {
  const reservation = req.body;
  console.log(reservation);
  const result = await reservationCollection.insertOne(reservation);
  res.send(result);
};

module.exports = {
  handlePostReservation,
};
