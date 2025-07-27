const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // or your MySQL username
  password: 'mj@@11mj', // your MySQL password
  database: 'inventory_system' // we'll create this database next
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL Database.');
});

module.exports = db;
