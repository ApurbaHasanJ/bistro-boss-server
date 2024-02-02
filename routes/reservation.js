const express = require('express')
const { handlePostReservation } = require('../controllers/reservation')
const router = express.Router()

router.post('/', handlePostReservation)

module.exports = router