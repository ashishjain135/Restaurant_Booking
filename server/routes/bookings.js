const express = require("express");
const router = express.Router();

const {
  
  getAvailableTables,
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  getDashboardData
} = require("../controllers/bookingController");



router.get("/available", getAvailableTables);

// ✅ Create a new booking and update table status
router.post("/book", createBooking);
// GET all bookings for dashboard
router.get("/dashboard/:userId", getDashboardData);
// ✅ Get all bookings for a user
router.get('/user/:userId', getUserBookings);

router.get('/', getAllBookings);

// ✅ Cancel a booking and free the table
router.post("/cancel/:id", cancelBooking);


module.exports = router;
