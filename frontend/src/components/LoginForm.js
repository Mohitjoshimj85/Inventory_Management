// src/components/login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'; // for redirection
import { Link } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const role = response.data.role;

      if (role === 'admin') {
        navigate('/developer'); // Redirect to Developer Dashboard
      } else if (role === 'user') {
        navigate('/client'); // Redirect to Client Dashboard
      } else {
        alert('Unknown role!');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Invalid credentials or server error!');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Signup here</Link></p>
    </div>
  );
}

export default LoginForm;
