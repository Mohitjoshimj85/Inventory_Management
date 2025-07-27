const db = require('../config/db');

exports.addProduct = (req, res) => {
  const { name, description, price, stock } = req.body;

  const query = 'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)';

  db.query(query, [name, description, price, stock], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  });
};
