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
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // 🔥 IMPORTANT: values manually extract karo
    const tableNumber = Number(req.body.tableNumber);
    const capacity = Number(req.body.capacity);
    const type = req.body.type;
    const status = req.body.status || "available";

    const newTable = new Table({
      tableNumber,
      capacity,
      type,
      status,
      image: req.file ? req.file.path : ""
    });

    const savedTable = await newTable.save();

    res.status(201).json(savedTable);

  } catch (error) {
    console.error("CREATE TABLE ERROR:", error);
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