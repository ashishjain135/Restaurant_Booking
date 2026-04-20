const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const Order = require('../models/Order');

exports.generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=invoice.pdf');

    doc.pipe(res);

    // 🔥 Fonts
    const regularFont = path.join(__dirname, '../fonts/NotoSans-Regular.ttf');
    const boldFont = path.join(__dirname, '../fonts/Montserrat-Bold.ttf');

    doc.font(regularFont);

    // 🔥 Watermark Logo
    const logoPath = path.join(__dirname, '../public/logo.png');

    if (fs.existsSync(logoPath)) {
      doc.opacity(0.08);
      doc.image(
        logoPath,
        doc.page.width / 2 - 150,
        doc.page.height / 2 - 150,
        { width: 300 }
      );
      doc.opacity(1);
    }

    // 🔥 HEADER
    doc.font(boldFont)
      .fontSize(20)
      .text('Jain Restaurant', { align: 'center' });

    doc.moveDown(0.3);

    doc.font(regularFont)
      .fontSize(10)
      .text('Chanderi, MP | Ph: 9876543210', { align: 'center' });

    doc.text('GSTIN: 22AAAAA0000A1Z5', { align: 'center' });

    doc.moveDown();

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    doc.moveDown();

    // 👤 CUSTOMER INFO
    doc.fontSize(12).text(`Customer: ${order.customerName || "Guest"}`);
    doc.text(`Mobile: ${order.mobile || "N/A"}`);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Date: ${new Date().toLocaleString()}`);

    doc.moveDown();

    // 🔥 TABLE HEADER
    const tableTop = doc.y;

    doc.font(boldFont);
    doc.text('Item', 50, tableTop);
    doc.text('Qty', 300, tableTop);
    doc.text('Price', 370, tableTop);
    doc.text('Total', 450, tableTop);

    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    let y = tableTop + 25;

    doc.font(regularFont);

    let subtotal = 0;

    // 🧾 ITEMS
    order.items.forEach((item) => {
      const itemTotal = item.quantity * item.price;
      subtotal += itemTotal;

      doc.text(item.name, 50, y);
      doc.text(item.quantity.toString(), 300, y);
      doc.text(`₹${item.price}`, 370, y);
      doc.text(`₹${itemTotal}`, 450, y);

      y += 20;
    });

    doc.moveTo(50, y).lineTo(550, y).stroke();

    y += 10;

    // 💰 CALCULATION
    const gst = subtotal * 0.05;
    const grandTotal = subtotal + gst;

    doc.font(boldFont);
    doc.text(`Subtotal: ₹${subtotal}`, 350, y);
    y += 20;

    doc.text(`GST (5%): ₹${gst.toFixed(2)}`, 350, y);
    y += 20;

    doc.fontSize(13).text(`Grand Total: ₹${grandTotal.toFixed(2)}`, 350, y);

    doc.moveDown(2);

    // 📞 FOOTER
    doc.font(regularFont)
      .fontSize(10)
      .text('For complaints contact:', { align: 'center' });

    doc.text('Owner: 9999999999', { align: 'center' });

    doc.moveDown();

    doc.text('Thank You! Visit Again', { align: 'center' });

    doc.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating invoice' });
  }
};