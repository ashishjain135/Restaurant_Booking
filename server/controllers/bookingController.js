const Booking = require("../models/booking");
const Table = require("../models/Tables");
const User = require("../models/UserModel");


// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const tableNumber = req.body.tableNumber;

    //check if duplicate booking exists for same table, date and time
    const existingBooking = await Booking.findOne({
      tableNumber,
      date: req.body.date,
      time: req.body.time,
      status: { $in: ["confirmed", "pending"] }
    });
    if(existingBooking) {
        alert(error.response?.data?.message);
      return res.status(400).json({ message: "Table already booked for this date and time" });
    }
    const storedUser = req.body.userId;

    const newBooking = new Booking({
      ...req.body,
      userId: storedUser,
      reference: `RSV${Math.floor(100000 + Math.random() * 900000)}`
    });

    const savedBooking = await newBooking.save();

    // update table status
    await Table.findOneAndUpdate(
      { tableNumber: Number(req.body.tableNumber) },
      {
        status: "occupied",
        bookingTime: new Date(`${req.body.date}T${req.body.time}`)
      },
      { new: true }
    );
    // console.log("Table status updated for table:", updateTable);
    if (global.io) {
      global.io.emit("tableBooked", {
        status: "occupied",
        tableNumber: req.body.tableNumber
      });
    }

    res.status(201).json(savedBooking);

  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
};



// CANCEL BOOKING
exports.cancelBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    await Table.findOneAndUpdate(
      { tableNumber: booking.tableNumber },
      { status: "available", bookingTime: null }
    );

    if (global.io) {
      global.io.emit("tableBooked", {
        status: "available",
        tableNumber: booking.tableNumber
      });
    }

    res.json(booking);

  } catch (err) {
    res.status(500).json({ message: "Cancel failed", error: err.message });
  }

};



// GET USER BOOKINGS
exports.getUserBookings = async (req, res) => {
  try {

    const bookings = await Booking
      .find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};



// GET ALL BOOKINGS
exports.getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking
      .find()
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};