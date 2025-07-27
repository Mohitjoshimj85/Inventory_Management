import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();

  // State to manage form input values
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  // State for managing loading and error states
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.price || !formData.stock) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send product data to the server
      await axios.post('http://localhost:5000/api/products/add', formData);
      alert('Product added successfully ✅');
      navigate('/developer'); // Redirect to dashboard on success
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container" style={{ padding: '20px' }}>
      <h2>Add New Product</h2>

      {/* Display error message if exists */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Product form */}
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={inputStyle}
          ></textarea>
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="price">Price (₹):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
            marginTop: '20px',
          }}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

// Inline styles for form elements
const formGroupStyle = {
  marginBottom: '15px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
};

export default AddProduct;
