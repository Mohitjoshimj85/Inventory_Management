import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ClientDashboard() {
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
    navigate("/login");
  };

  const handleOrder = (product) => {
    fetch("http://localhost:5000/api/orders/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: product.id , quantity: 1 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to place order");
        }
        return response.json();
      })
      .then((data) => {
        alert(`✅ Order placed successfully for: ${product.name}`);
        fetchProducts(); // Refresh products after ordering
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("❌ Failed to place the order or product is out of stock.");
      });
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
        <h1>Client Dashboard</h1>
        <nav>
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
            <div style={{ marginTop: "20px" }}>
              <button 
                onClick={() => handleOrder(product)}
                style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Order
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ClientDashboard;
