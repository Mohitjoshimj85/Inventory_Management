import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    // Clear any tokens if you have
    navigate("/");
  };

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete product");
          }
          fetchProducts(); // Refresh products after delete
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  return (
    <div className="dashboard-container">

      {/* Header */}
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "20px", 
        backgroundColor: "#f5f5f5" 
      }}>
        <h1>Developer Dashboard</h1>
        <nav>
          <Link to="/add-product" style={{ marginRight: "20px" }}>Add Product</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      {/* Total Products */}
      <div style={{ padding: "20px" }}>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <h3>Total Products: {products.length}</h3>
        )}
      </div>

      {/* Product Cards */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "20px", 
        padding: "20px",
        justifyContent: "flex-start"
      }}>
        {products.map((product) => (
          <div key={product._id} style={{ 
            border: "1px solid #ccc", 
            padding: "20px", 
            width: "250px", 
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
          }}>
            <h4>{product.name}</h4>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <Link to={`/edit-product/${product.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;
