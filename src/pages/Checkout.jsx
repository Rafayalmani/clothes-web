// src/pages/Checkout.jsx (Add popup)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { formatPrice } from '../utils/currencyFormatter';
import OrderPlacedPopup from '../components/OrderPlacedPopup'; // Add this import

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useCart();
  const { 
    shippingInfo, 
    updateShippingInfo,
    deliveryMethod,
    setDeliveryMethod,
    shippingCost,
    grandTotal,
    processCheckout
  } = useCheckout();

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Add popup state
  const [placedOrderId, setPlacedOrderId] = useState(''); // Add order ID state

  const isShippingValid = () => {
    return (
      shippingInfo.fullName &&
      shippingInfo.email &&
      shippingInfo.phone &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.postalCode
    );
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);
    setError('');
    
    try {
      const result = await processCheckout();
      
      if (result.success) {
        // Save order details
        const orderDetails = {
          orderId: result.orderId,
          customer: {
            fullName: shippingInfo.fullName,
            email: shippingInfo.email
          }
        };
        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
        
        // Show popup
        setPlacedOrderId(result.orderId);
        setShowPopup(true);
        
        // Navigate after popup closes (3 seconds)
        setTimeout(() => {
          navigate(`/order-confirmation/${result.orderId}`);
        }, 3000);
        
      } else {
        setError('Failed to place order');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/shop');
    return null;
  }

  return (
    <>
      <motion.div 
        className="py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container">
          <h1 className="text-center mb-4">Checkout</h1>

          {step === 1 ? (
            // Step 1: Shipping Information
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="mb-4">Shipping Information</h5>
                    
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Full Name *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={shippingInfo.fullName || ''} 
                          onChange={(e) => updateShippingInfo('fullName', e.target.value)} 
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email *</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          value={shippingInfo.email || ''} 
                          onChange={(e) => updateShippingInfo('email', e.target.value)} 
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone *</label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          value={shippingInfo.phone || ''} 
                          onChange={(e) => updateShippingInfo('phone', e.target.value)} 
                          placeholder="03XXXXXXXXX" 
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Address *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={shippingInfo.address || ''} 
                          onChange={(e) => updateShippingInfo('address', e.target.value)} 
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">City *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={shippingInfo.city || ''} 
                          onChange={(e) => updateShippingInfo('city', e.target.value)} 
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Postal Code *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={shippingInfo.postalCode || ''} 
                          onChange={(e) => updateShippingInfo('postalCode', e.target.value)} 
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h5 className="mb-3">Delivery Method</h5>
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <div 
                          className={`card border-2 ${deliveryMethod === 'standard' ? 'border-primary' : ''}`} 
                          style={{ cursor: 'pointer' }} 
                          onClick={() => setDeliveryMethod('standard')}
                        >
                          <div className="card-body py-2">
                            <div className="form-check">
                              <input 
                                type="radio" 
                                className="form-check-input" 
                                checked={deliveryMethod === 'standard'} 
                                readOnly 
                              />
                              <label className="form-check-label fw-bold">Standard Shipping</label>
                            </div>
                            <p className="small mb-0">5-7 days • Rs. 200</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-2">
                        <div 
                          className={`card border-2 ${deliveryMethod === 'express' ? 'border-primary' : ''}`} 
                          style={{ cursor: 'pointer' }} 
                          onClick={() => setDeliveryMethod('express')}
                        >
                          <div className="card-body py-2">
                            <div className="form-check">
                              <input 
                                type="radio" 
                                className="form-check-input" 
                                checked={deliveryMethod === 'express'} 
                                readOnly 
                              />
                              <label className="form-check-label fw-bold">Express Shipping</label>
                            </div>
                            <p className="small mb-0">2-3 days • Rs. 500</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {error && <div className="alert alert-danger mt-3">{error}</div>}

                    <button 
                      className="btn btn-dark w-100 mt-4 py-2" 
                      onClick={() => isShippingValid() ? setStep(2) : setError('Please fill all fields')}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Step 2: COD Only
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body text-center p-4">
                    <i className="bi bi-cash-stack text-success" style={{ fontSize: '3rem' }}></i>
                    <h4 className="mt-3">Cash on Delivery</h4>
                    <p className="text-muted">Pay when you receive your order</p>

                    <div className="bg-light p-3 rounded mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Subtotal:</span>
                        <span className="fw-bold">{formatPrice(totalAmount)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Shipping:</span>
                        <span className="fw-bold">{formatPrice(shippingCost)}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <span className="h6">Total to Pay:</span>
                        <span className="h6 fw-bold text-success">{formatPrice(grandTotal)}</span>
                      </div>
                    </div>

                    <p className="small text-muted mb-3">
                      Have {formatPrice(grandTotal)} in cash ready when your order arrives
                    </p>

                    {error && <div className="alert alert-danger py-2">{error}</div>}

                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-outline-secondary w-50" 
                        onClick={() => setStep(1)}
                      >
                        Back
                      </button>
                      <button 
                        className="btn btn-success w-50" 
                        onClick={handlePlaceOrder} 
                        disabled={processing}
                      >
                        {processing ? 'Placing Order...' : 'Place Order'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="col-md-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h6 className="mb-3">Order Items</h6>
                    {cartItems.map(item => (
                      <div key={item.id} className="d-flex justify-content-between small mb-2">
                        <span>{item.name} x{item.quantity}</span>
                        <span>{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total:</span>
                      <span className="text-success">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Order Placed Popup */}
      <OrderPlacedPopup 
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        orderId={placedOrderId}
      />
    </>
  );
};

export default Checkout;