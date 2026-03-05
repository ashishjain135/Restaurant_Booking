const Table = require("../models/Tables");
const upload = require("../middleware/upload"); // For handling image uploads
// 🟢 Get all tables
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔵 Add new table
exports.createTable = async (req, res) => {
  try {

    const { tableNumber, capacity, type, status } = req.body;

    const newTable = new Table({
      tableNumber,
      capacity,
      type,
      status,
      image: req.file ? req.file.path : null // Save the image path if uploaded
    });

    const savedTable = await newTable.save();

    res.status(201).json(savedTable);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// 🟡 Update table status
exports.updateTableStatus = async (req, res) => {

  try {

    const { tableNumber } = req.params;

    const updated = await Table.findOneAndUpdate(
      { tableNumber: Number(tableNumber) },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Table not found" });
    }

    // socket real-time update
    if (global.io) {
      global.io.emit("tableUpdated", updated);
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};


// 🔴 Delete table
exports.deleteTable = async (req, res) => {

  try {

    const { tableNumber } = req.params;

    const deleted = await Table.findOneAndDelete({
      tableNumber: Number(tableNumber)
    });

    if (!deleted) {
      return res.status(404).json({ message: "Table not found" });
    }

    res.json({ message: "Table deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};