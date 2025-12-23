const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/userMiddleware.js');

const {
    createBooking,
    getBookings
}= require('../controllers/bookingController.js');

router.route('/').get(isLoggedIn, getBookings).post(isLoggedIn, createBooking);

module.exports = router;