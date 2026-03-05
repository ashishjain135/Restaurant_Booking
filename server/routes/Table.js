// server/routes/table.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // For handling image uploads
const {
  getTables,
  createTable,
  updateTableStatus,
  deleteTable,
} = require("../controllers/tableController");


// 🟢 Get all table
router.get("/", getTables);

// 🔵 Add new table
router.post("/",
  upload.single("image"), // Middleware to handle single image upload with field name 'image'
   createTable);

// 🟡 Update table status
router.patch("/by-number/:tableNumber", updateTableStatus);

// 🔴 Delete table
router.delete("/by-number/:tableNumber", deleteTable);

module.exports = router;
