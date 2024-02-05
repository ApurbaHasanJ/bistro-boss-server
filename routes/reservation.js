const express = require('express')
const { handlePostReservation, handleGetUserReservations } = require('../controllers/reservation')
const router = express.Router()

router.post('/user', handlePostReservation)
router.get('/user/:email', handleGetUserReservations)

module.exports = router