// src/pages/Cart.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currencyFormatter';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <motion.div 
        className="py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container text-center">
          <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: '#ccc' }}></i>
          <h3 className="mt-3">Your cart is empty</h3>
          <Link to="/shop" className="btn btn-dark mt-3">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container">
        <h1 className="text-center mb-4">Shopping Cart</h1>

        <div className="row">
          <div className="col-lg-8">
            {cartItems.map(item => (
              <div key={item.id} className="card mb-3 shadow-sm">
                <div className="row g-0 align-items-center">
                  <div className="col-3 col-md-2">
                    <img src={item.image} alt={item.name} className="img-fluid p-2" style={{ maxHeight: '100px', objectFit: 'cover' }} />
                  </div>
                  <div className="col-9 col-md-10">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <h6 className="mb-1">{item.name}</h6>
                          <p className="text-primary fw-bold mb-0">{formatPrice(item.price)}</p>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="d-flex align-items-center">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                            <span className="mx-2">{item.quantity}</span>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                          </div>
                        </div>
                        <div className="col-4 col-md-3">
                          <span className="fw-bold">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                        <div className="col-2 col-md-2 text-end">
                          <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span className="fw-bold">{formatPrice(totalAmount)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className="text-success">Calculated at checkout</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="h5">Total</span>
                  <span className="h5 fw-bold text-primary">{formatPrice(totalAmount)}</span>
                </div>
                <button className="btn btn-success w-100 py-2 mb-2" onClick={() => navigate('/checkout')}>
                  Proceed to Checkout
                </button>
                <button className="btn btn-outline-secondary w-100" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;