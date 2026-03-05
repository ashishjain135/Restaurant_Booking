const express = require("express");
const router = express.Router();

const {
  createBooking,
  cancelBooking,
  getUserBookings,
  getAllBookings
} = require("../controllers/bookingController");

// ✅ Create a new booking and update table status
router.post("/", createBooking);



// ✅ Cancel a booking and free the table
router.post("/cancel/:id", cancelBooking);


// ✅ Get all bookings for a user
router.get('/user/:userId', getUserBookings);


// GET all bookings
router.get('/', getAllBookings);


module.exports = router;
