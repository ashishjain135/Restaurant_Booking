const express = require('express');
const router = express.Router();

const {
  getAllMenuItems,
  createMenuItem,
  deleteMenuItem,
  updateMenuItem,
  getDashboardStats
} = require('../controllers/menuController');


//sort by category
// const items = await MenuItem.find().sort({ category: -1 }); // 1 for ascending, -1 for descending

router.get('/', getAllMenuItems);          // GET all menu items (with optional category filter)
router.post('/', createMenuItem); // POST a new dish
router.delete('/:id', deleteMenuItem); // DELETE a dish by ID
router.put('/:id', updateMenuItem); // UPDATE a dish by ID
router.get('/dashboard-stats', getDashboardStats); // GET dashboard const [first, setfirst] = useState(second)

module.exports = router;

