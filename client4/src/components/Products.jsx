import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // For loading state
  const [error, setError] = useState(null);  // For error handling

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3400/api/product');
        setProducts(res.data);
      } catch (error) {
        setError('Error fetching products, please try again later.');
      } finally {
        setLoading(false); // Set loading to false after fetching completes (success or error)
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Display loading text or a spinner while data is being fetched
  }

  if (error) {
    return <div>{error}</div>;  // Display an error message if there was an issue fetching products
  }

  return (
    <div className="products-container">
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products available at the moment.</p>  // Display this if there are no products in the list
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price}</p>
              <Link to={`/products/${product._id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
