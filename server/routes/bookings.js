const express = require("express");
const router = express.Router();

const {
  
  getAvailableTables,
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking
} = require("../controllers/bookingController");



router.get("/available", getAvailableTables);

// ✅ Create a new booking and update table status
router.post("/book", createBooking);
// GET all bookings

// ✅ Get all bookings for a user
router.get('/user/:userId', getUserBookings);

router.get('/', getAllBookings);

// ✅ Cancel a booking and free the table
router.post("/cancel/:id", cancelBooking);


module.exports = router;
