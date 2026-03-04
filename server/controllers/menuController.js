/**
 * Menu Controller - Handles menu-related operations such as fetching, adding, and deleting dishes.
 */
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');
const upload = require('../middleware/upload'); // For handling image uploads


// ✅ GET all menu items
exports.getAllMenuItems = router.get('/', async (req, res) => {
  try {
    const {category} = req.query;
    let filter = {};
    if(category){
      filter.category = category;
    }
    
    const items = await MenuItem.find(filter).sort({updatedAt:-1}); // Sort by most recently updated
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// ✅ POST a new dish
exports.createMenuItem = router.post('/', 
    upload.single('image'), // Middleware for handling image upload
    async (req, res) => {
  try {
    console.log(req.file);
    console.log("📦 Received payload:", req.body);
    const { dishName, category, isTodaySpecial, price, description } = req.body;

    console.log("📦 Received payload:", req.body);

    if (!dishName || !category || !price || !description) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!req.file) {
      console.log("❌ Image file is required");
      return res.status(400).json({ error: "Image file is required." });
    }
    const newDish = new MenuItem({
      dishName,
      category,
      isTodaySpecial: isTodaySpecial || false,
      price,
      image:req.file ? req.file.path : null, // Save the image path if uploaded
      description
    });

    // 👇 validate before saving
    await newDish.validate();
    const savedDish = await newDish.save();

    console.log("✅ Dish saved:", savedDish);
    res.status(201).json(savedDish);
  } catch (err) {
    console.error('❌ Error in POST /api/menu:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// ✅ DELETE a dish
exports.deleteMenuItem = router.delete('/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dish deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete dish' });
  }
});

// ✅ PUT (Update) a dish
exports.updateMenuItem = router.put('/:id', async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update dish' });
  }
});


// ✅ GET dashboard stats (with category-wise count)
exports.getDashboardStats = router.get('/stats/dashboard', async (req, res) => {
  try {
    // 1. Unique categories
    const uniqueCategories = await MenuItem.distinct('category');
    const totalCategories = uniqueCategories.length;

    // 2. Total dishes
    const totalItems = await MenuItem.countDocuments();

    // 3. Today's specials
    const todaysSpecials = await MenuItem.countDocuments({ isTodaySpecial: true });

    // 4. Category-wise dish count
    const categoryCounts = await MenuItem.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          count: 1
        }
      }
    ]);

    res.json({
      totalCategories,
      totalItems,
      todaysSpecials,
      categoryStats: categoryCounts
    });
  } catch (err) {
    console.error('❌ Failed to fetch dashboard stats:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// MenuItem.find().sort({createdAt:-1})