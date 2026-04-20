const express = require('express');
const router = express.Router();
const { generateInvoice } = require('../controllers/invoiceController');

// GET /api/invoice/:id
router.get('/:id', generateInvoice);

module.exports = router;