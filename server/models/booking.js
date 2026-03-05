const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
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
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  guests: { 
    type: Number, 
    required: true, 
    default: 2 
  },
  tableNumber:{
    type: Number,
    ref: "Table",
    required: true
  },
  specialRequests: String,
  addons: [String],
  allergies: String,
  reference: {
    type: String,
    unique: true,
  },
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

  status: {
    type: String,
    enum: ["confirmed", "cancelled", "pending", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

bookingSchema.index({ tableNumber: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model("booking", bookingSchema);
