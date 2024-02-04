const express = require('express')
const { handlePostReservation } = require('../controllers/reservation')
const router = express.Router()

router.post('/user', handlePostReservation)

module.exports = router