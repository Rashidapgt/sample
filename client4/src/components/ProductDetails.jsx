import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // To navigate to edit page
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Fetch product details by ID
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:3400/api/product/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  // Handle the delete product action
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3400/api/product/${id}`);
      alert("Product deleted successfully!");
      navigate('/products'); // Navigate back to products list
    } catch (error) {
      console.error('Error deleting product:', error);
      alert("Failed to delete the product.");
    }
  };

  // Handle add to cart action
  const handleAddToCart = () => {
    // Check if product is already in cart
    if (cart.some(item => item.id === product._id)) {
      alert("Product is already in the cart.");
      return;
    }

    // Add product to cart
    cart.push({ id: product._id, name: product.name, price: product.price });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
  };

  return (
    <div className="product-details-container">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>

      {/* Action buttons */}
      <div className="action-buttons">
        <Link to={`/edit-product/${product._id}`}>
          <Button className="edit-button">Edit Product</Button>
        </Link>

        <Button className="delete-button" onClick={handleDelete}>Delete Product</Button>
        <Button /*className="add-to-cart-button"*/ onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </div>
  );
}

export default ProductDetails;


