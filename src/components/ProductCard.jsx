// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currencyFormatter';
import CartPopup from './CartPopup';

const ProductCard = ({ product }) => {
  const { addToCart, totalAmount, cartItems } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedProduct(product);
    setShowPopup(true);
  };

  return (
    <>
      <motion.div 
        className="card h-100 border-0 shadow-sm"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <div style={{ width: '100%', height: '250px', overflow: 'hidden' }}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Link>
        
        <div className="card-body text-center p-2 p-md-3">
          <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
            <h6 className="card-title mb-1" style={{ fontSize: '0.9rem' }}>
              {product.name}
            </h6>
          </Link>
          <p className="card-text fw-bold text-primary mb-2">
            {formatPrice(product.price)}
          </p>
          <button 
            className="btn btn-outline-dark w-100 btn-sm"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </motion.div>

      <CartPopup 
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        product={addedProduct}
        cartTotal={totalAmount}
        cartCount={totalItems}
      />
    </>
  );
};

export default ProductCard;