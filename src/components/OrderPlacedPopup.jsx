// src/components/OrderPlacedPopup.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderPlacedPopup = ({ isOpen, onClose, orderId }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ 
              background: 'rgba(0,0,0,0.3)',
              zIndex: 1040,
              backdropFilter: 'blur(2px)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            className="position-fixed top-50 start-50 translate-middle"
            style={{ zIndex: 1050, width: '90%', maxWidth: '350px' }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="card border-0 shadow-lg text-center">
              <div className="card-body p-4">
                
                {/* Success Icon */}
                <div className="bg-success text-white rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-check-lg" style={{ fontSize: '2rem' }}></i>
                </div>

                {/* Message */}
                <h5 className="text-success mb-2">
                  Your Order is Placed!
                </h5>

                {/* Order ID */}
                {orderId && (
                  <p className="text-muted small mb-3">
                    Order #{orderId}
                  </p>
                )}

                {/* Close Button */}
                <button 
                  className="btn btn-success w-100"
                  onClick={onClose}
                >
                  OK
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderPlacedPopup;