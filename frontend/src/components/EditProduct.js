import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    stock: "",
    price: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        // IMPORTANT: if response.data is an array
        if (Array.isArray(response.data)) {
          setProduct(response.data[0]); 
        } else {
          setProduct(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.put(`http://localhost:5000/api/products/${id}`, {
      name: product.name,   // ✨ Include name also!
      stock: product.stock,
      price: product.price,
    })
    .then(() => {
      alert("Product updated successfully ✅");
      navigate("/developer");
    })
    .catch((error) => {
      console.error("Failed to update product:", error);
      alert("Failed to update product ❌");
    });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={product.name}
            readOnly
          />
        </div>

        <div>
          <label>Stock:</label><br />
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price:</label><br />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
