import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Store!</h1>
      <Link to="/products">Browse Products</Link>
    </div>
  );
};

export default Home;
