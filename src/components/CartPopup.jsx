// src/components/CartPopup.jsx (Mobile responsive)
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/currencyFormatter';

const CartPopup = ({ isOpen, onClose, product, cartTotal, cartCount }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ 
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1040,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup - Mobile Responsive */}
          <motion.div
            className="position-fixed start-50 translate-middle-x"
            style={{ 
              zIndex: 1050, 
              width: '90%',
              maxWidth: '400px',
              bottom: '20px',
              top: 'auto'
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-success text-white py-2 py-md-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <h6 className="mb-0 flex-grow-1">Added to Cart!</h6>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={onClose}
                    style={{ fontSize: '0.8rem' }}
                  ></button>
                </div>
              </div>

              <div className="card-body p-3">
                {/* Product Info - Responsive */}
                <div className="d-flex align-items-center mb-3">
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    flexShrink: 0
                  }}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div className="ms-3" style={{ minWidth: 0 }}>
                    <h6 className="fw-bold mb-1" style={{
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {product.name}
                    </h6>
                    <p className="text-primary fw-bold mb-0" style={{ fontSize: '0.9rem' }}>
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

                {/* Cart Summary - Responsive */}
                <div className="bg-light p-2 rounded mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ fontSize: '0.9rem' }}>Cart Total:</span>
                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span style={{ fontSize: '0.9rem' }}>Total Items:</span>
                    <span className="fw-bold" style={{ fontSize: '0.9rem' }}>{cartCount}</span>
                  </div>
                </div>

                {/* Action Buttons - Responsive */}
                <div className="d-flex gap-2">
                  <Link 
                    to="/cart" 
                    className="btn btn-outline-primary flex-grow-1"
                    onClick={onClose}
                    style={{ fontSize: '0.9rem', padding: '0.5rem' }}
                  >
                    View Cart
                  </Link>
                  <Link 
                    to="/checkout" 
                    className="btn btn-success flex-grow-1"
                    onClick={onClose}
                    style={{ fontSize: '0.9rem', padding: '0.5rem' }}
                  >
                    Checkout
                  </Link>
                </div>

                {/* Continue Shopping */}
                <div className="text-center mt-2">
                  <button 
                    className="btn btn-link text-muted text-decoration-none p-0"
                    onClick={onClose}
                    style={{ fontSize: '0.85rem' }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPopup;