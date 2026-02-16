// src/pages/ProductDetails.jsx (Add popup)
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currencyFormatter';
import CartPopup from '../components/CartPopup';
import products from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart, totalAmount, totalItems } = useCart();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="py-5">
        <div className="container text-center">
          <h2>Product not found</h2>
          <button className="btn btn-dark mt-3" onClick={() => navigate('/shop')}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add product multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    // Show popup
    setShowPopup(true);
    
    // Scroll to top to show popup
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.div 
        className="py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/shop" className="text-decoration-none">Shop</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="row g-5">
            {/* Product Image */}
           <div className="col-md-6">
  <div className="card border-0 shadow-sm">
    <div style={{ 
      width: '100%', 
      height: '600px', 
      overflow: 'hidden',
      backgroundColor: '#f8f9fa'
    }}>
      <img 
        src={product.image} 
        alt={product.name}
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
    </div>
  </div>
</div>

            {/* Product Details */}
            <div className="col-md-6">
              <h1 className="mb-3">{product.name}</h1>
              
              <div className="mb-4">
                <span className="display-6 fw-bold text-primary">
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="mb-4">
                <p className="lead">{product.description}</p>
              </div>

              {/* Product Details List */}
              <div className="mb-4">
                <h5 className="mb-3">Product Details:</h5>
                <ul className="list-unstyled">
                  {product.details?.map((detail, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <label htmlFor="quantity" className="form-label fw-bold mb-3">
                  Quantity:
                </label>
                <div className="d-flex align-items-center">
                  <motion.button 
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1 || !product.inStock}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span className="mx-3 min-width-50 text-center fs-5 fw-bold">
                    {quantity}
                  </span>
                  <motion.button 
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10 || !product.inStock}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                  <span className="text-muted ms-3">
                    (Max: 10)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-3">
                <motion.button 
                  className="btn btn-dark btn-lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Add to Cart - {formatPrice(product.price * quantity)}
                </motion.button>
                
                <Link to="/cart" className="btn btn-outline-dark btn-lg">
                  <i className="bi bi-cart me-2"></i>
                  View Cart
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-4 pt-4 border-top">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center text-muted">
                      <i className="bi bi-truck me-2 fs-5"></i>
                      <small>Free shipping on orders {formatPrice(5000)}+</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center text-muted">
                      <i className="bi bi-arrow-return-left me-2 fs-5"></i>
                      <small>30-day easy returns</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cart Popup */}
      <CartPopup 
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        product={product}
        cartTotal={totalAmount}
        cartCount={totalItems}
      />
    </>
  );
};

export default ProductDetails;