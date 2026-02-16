// src/pages/OrderConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  // Get order details from localStorage (saved during checkout)
  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem('lastOrder');
      if (savedOrder) {
        setOrderDetails(JSON.parse(savedOrder));
      }
    } catch (error) {
      console.error('Error loading order:', error);
    }
  }, []);

  return (
    <motion.div 
      className="py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-0 shadow-lg">
              <div className="card-body text-center p-5">
                
                {/* Success Icon */}
                <div className="bg-success text-white rounded-circle d-inline-flex p-4 mb-4">
                  <i className="bi bi-check-lg" style={{ fontSize: '3rem' }}></i>
                </div>

                {/* Order Confirmed Text */}
                <h2 className="text-success mb-3">Order Confirmed!</h2>
                
                {/* Order ID */}
                <div className="bg-light p-3 rounded mb-4">
                  <p className="text-muted mb-1">Order ID</p>
                  <h5 className="fw-bold">{orderId}</h5>
                </div>

                {/* Customer Details */}
                {orderDetails && (
                  <div className="text-start mb-4">
                    <h6 className="mb-3">Customer Details</h6>
                    
                    <div className="mb-2">
                      <small className="text-muted d-block">Name</small>
                      <strong>{orderDetails.customer?.fullName || 'N/A'}</strong>
                    </div>
                    
                    <div className="mb-2">
                      <small className="text-muted d-block">Email</small>
                      <strong>{orderDetails.customer?.email || 'N/A'}</strong>
                    </div>
                  </div>
                )}

                {/* Email Confirmation Message */}
                <div className="alert alert-success">
                  <i className="bi bi-envelope-check me-2"></i>
                  You will receive a confirmation email soon.
                </div>

                {/* Continue Shopping Button */}
                <a href="/shop" className="btn btn-dark mt-3 px-5">
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;