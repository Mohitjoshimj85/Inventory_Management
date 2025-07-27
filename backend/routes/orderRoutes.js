const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ✅ your MySQL database connection

// Place a new order
router.post('/place', (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // First, check product stock
  const stockQuery = 'SELECT stock FROM products WHERE id = ?';
  db.query(stockQuery, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching product stock:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const currentStock = results[0].stock;

    if (currentStock < quantity) {
      return res.status(400).json({ message: '❌ Failed to place the order or product is out of stock.' });
    }

    // Enough stock -> Insert into orders table (optional: create an orders table if you don't have one)
    const insertOrderQuery = 'INSERT INTO orders (productid, quantity) VALUES (?, ?)';
    db.query(insertOrderQuery, [productId, quantity], (err, orderResult) => {
      if (err) {
        console.error('Error inserting order:', err.message);
        return res.status(500).json({ message: 'Database error while placing order' });
      }

      // After order placed, update product stock
      const updateStockQuery = 'UPDATE products SET stock = stock - ? WHERE id = ?';
      db.query(updateStockQuery, [quantity, productId], (err, updateResult) => {
        if (err) {
          console.error('Error updating stock:', err.message);
          return res.status(500).json({ message: 'Database error while updating stock' });
        }

        res.json({ message: '✅ Order placed successfully and stock updated!' });
      });
    });
  });
});

// Get all orders
router.get('/', (req, res) => {
  const query = `
    SELECT orders.id, products.name AS productName, orders.quantity, orders.created_at
    FROM orders
    JOIN products ON orders.product_id = products.id
    ORDER BY orders.created_at DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err.message);
      return res.status(500).json({ message: 'Database error while fetching orders' });
    }

    res.json(results);
  });
});

module.exports = router;
