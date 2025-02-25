import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {Button}from 'react-bootstrap'

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/login'); 
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
       <li>
          <Link to="/products/:id">ProductDetails</Link>
        </li>
        
        
        {isAuthenticated ? (
          <li>
            <Button onClick={handleLogout}>Logout</Button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
