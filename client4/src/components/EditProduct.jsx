import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:3400/api/product/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3400/api/product/${id}`, product);
      alert("Product updated successfully!");
      navigate(`/products/${id}`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={product.name} onChange={handleChange} required />
      <textarea name="description" value={product.description} onChange={handleChange} required />
      <input type="number" name="price" value={product.price} onChange={handleChange} required />
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProduct;
