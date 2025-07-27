const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ✅ correct



// Get all products
  router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  
  // Get products with low stock
  router.get('/low-stock', (req, res) => {
    db.query('SELECT * FROM products WHERE stock < 5', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });


// Get a single product by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM products WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(results[0]);  // Send the single product
  });
});

//update
router.put('/:id', (req, res) => {
  const { name, stock, price } = req.body;
  const { id } = req.params;

  const query = 'UPDATE products SET name = ?, stock = ?, price = ? WHERE id = ?';
  const values = [name, stock, price, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating product:', err.message);
      return res.status(500).json({ message: 'Failed to update product' });
    }

    res.json({ message: 'Product updated successfully' });
  });
});

// Add Product Route
router.post('/add', (req, res) => {
  const { name, description, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const query = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';
  const values = [name, description || '', price, stock];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting product:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ message: 'Product added successfully', productId: result.insertId });
  });
});


// Delete Product Route
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log('Deleting product with ID:', id); // Debug log

  const query = 'DELETE FROM products WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err.message);
      return res.status(500).json({ message: 'Failed to delete product' });
    }

    if (result.affectedRows === 0) {
      console.log(`No product found with ID: ${id}`); // Debug log
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  });
});



  
module.exports = router;
