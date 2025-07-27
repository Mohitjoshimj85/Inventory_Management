const express = require('express');
const app = express();
const cors = require('cors');

// Import route files
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/auth');


// Middleware to parse JSON body
app.use(express.json());

// CORS setup to allow all origins
app.use(cors());

// Use routes for products and orders
app.use('/api/products', productRoutes); // Products routes
app.use('/api/orders', orderRoutes); // Orders routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
