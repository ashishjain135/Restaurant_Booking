const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  tableId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Table", 
    required: true 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: { 
    type: Date, 
    required: true 
  },
  timeSlot: { 
    type: String, 
    required: true 
  }, // Format: "12:00-14:00"
  guests: { 
    type: Number, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  reference: { 
    type: String, 
    unique: true 
  },
  status: { 
    type: String, 
    enum: ["confirmed", "cancelled", "pending", "completed"], 
    default: "confirmed" 
  }
}, { timestamps: true });

// Sabse important scaling point: Unique Index
// Ek table, ek date aur ek specific timeslot par sirf ek hi confirmed booking ho sakti hai.
bookingSchema.index({ tableId: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);