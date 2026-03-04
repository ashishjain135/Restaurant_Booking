
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  dishName: {
    type: String, 
    required: true,
    trim: true
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Appetizer', 'Main Course', 'Rice',
      'Breads','Dessert', 'Beverage', 'Salad', 'Soup', 'Side Dish', 'Specials', 'Kids', 'Vegan', 'Ice-Cream','Gluten-Free', 'Breakfast', 'Lunch', 'Dinner']
  }, // 🔁 CHANGED from ObjectId to String
  price: { 
    type: Number, 
    required: true
  },
  isTodaySpecial: {
    type: Boolean, 
    default: false 
  },
  image:{
    type:String,
    required:true
  },
  description: { 
    type: String, 
    required: true 
  },
  isAvailable: { 
    type: Boolean, 
    default: true 
  },


},
{ timestamps: true } // ✅ Add timestamps for createdAt and updatedAt
);


menuItemSchema.index({ dishName: 1, category: 1 }, { unique: true });
module.exports = mongoose.model("MenuItem", menuItemSchema);
