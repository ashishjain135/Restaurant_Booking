// server/models/TableBooking.js
const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  type: {
    type: [String],
    enum: ["Regular", "family", "private","hall", "outdoor"],
    default: "Regular",
  },
  image: {
    type: String,
  },
  status:{
    type:String,
    enum:["available", "reserved", "occupied"],
    default:"available",
  },
}, { timestamps: true });

module.exports = mongoose.model("Table", tableSchema);
