/*import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your Cart is empty!!</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.title}-${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Cart;*/
import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Read cart from localStorage every time the component is rendered
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default CartPage;
