const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Login API
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    res.json({ role: user.role });
  });
});

// Signup API
router.post('/signup', (req, res) => {
    const { email, password, role } = req.body;
  
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Check if the user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
  
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      // Insert new user
      const insertQuery = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
      db.query(insertQuery, [email, password, role], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });
  
        res.json({ message: 'Signup successful' });
      });
    });
  });
  

module.exports = router;
