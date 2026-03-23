const Booking = require("../models/booking");
const Table = require("../models/Tables");
const User = require("../models/UserModel");

// 1. GET AVAILABLE TABLES (Frontend pehle isse call karega)
exports.getAvailableTables = async (req, res) => {
  try {
    const { date, timeSlot, guests } = req.query;

    console.log("Searching:", date, timeSlot);

    if (!date || !timeSlot) {
      return res.status(400).json({ message: "Date & Time required" });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedTableIds = await Booking.find({
      date: { $gte: startOfDay, $lte: endOfDay },
      timeSlot,
      status: { $in: ["confirmed", "pending"] }
    }).distinct("tableId");

    const availableTables = await Table.find({
      _id: { $nin: bookedTableIds },
      capacity: { $gte: Number(guests) || 1 }
    });

    res.json({
      success: true,
      count: availableTables.length,
      data: availableTables
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tables" });
  }
};

// 2. CREATE BOOKING (Jab user table select karke 'Confirm' karega)
exports.createBooking = async (req, res) => {
  try {

    

    const { tableId, date, timeSlot, userId } = req.body;

    // ✅ Normalize date properly
    const bookingDate = new Date(date);
    bookingDate.setHours(0, 0, 0, 0);

    const existingBooking = await Booking.findOne({
      tableId,
      date: bookingDate,
      timeSlot,
      status: { $in: ["confirmed", "pending"] }
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Table already booked!" });
    }

    const reference = `RSV${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking = new Booking({
      ...req.body,
      date: bookingDate,   // ✅ FIXED
      userId,
      reference
    });

    const savedBooking = await newBooking.save();

    if (global.io) {
      global.io.emit("tableBooked", {
        tableId,
        status: "occupied"
      });
    }

    res.status(201).json({ success: true, data: savedBooking });

  } catch (err) {
     console.error("🔥 BOOKING ERROR:", err);   // 👈 ADD THIS
    if (err.code === 11000) {
      return res.status(400).json({ message: "Slot already taken." });
    }
    res.status(500).json({ success: false, message: "Booking failed" });
  }
};



// 3. CANCEL BOOKING
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();

    if (global.io) {
      global.io.emit("tableStatusChanged", {
        tableId: booking.tableId,
        status: "available"
      });
    }

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Cancel failed", error: err.message });
  }
};

// 4. GET USER BOOKINGS (For Dashboard)
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
                                  .populate('tableId') // Table ki details bhi mil jayengi
                                  .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// 5. GET ALL BOOKINGS (For Admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('tableId').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};