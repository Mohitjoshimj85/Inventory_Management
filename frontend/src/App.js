// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Routes and Route from v6
import LoginForm from './components/LoginForm'; // Adjust the import path if necessary
import DeveloperDashboard from './components/DeveloperDashboard'; // Create this component
import ClientDashboard from './components/ClientDashboard'; // Create this component
import SignupForm from './components/SignupForm'; // Import SignupForm
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";




function App() {
  return (
    <Router>
      <div className="App">
        <h1>Smart Inventory System</h1>
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/" element={<LoginForm />} />  {/* Using element prop instead of component */}
          <Route path="/developer" element={<DeveloperDashboard />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
