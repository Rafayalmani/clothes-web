// src/context/CheckoutContext.jsx (with Google Sheets)
import React, { createContext, useContext, useState } from 'react';
import { useCart } from './CartContext';
import { saveOrderToGoogleSheets } from '../services/googleSheets';

const CheckoutContext = createContext();

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }
  return context;
};

export const CheckoutProvider = ({ children }) => {
  const { cartItems, totalAmount, clearCart } = useCart();
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'PK'
  });
  
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [orderStatus, setOrderStatus] = useState('idle');
  const [orderId, setOrderId] = useState(null);
  const [sheetsStatus, setSheetsStatus] = useState('idle'); // idle, saving, saved, error

  // Shipping costs
  const shippingCost = deliveryMethod === 'express' ? 500 : 200;
  const grandTotal = totalAmount + shippingCost;

  const updateShippingInfo = (field, value) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateOrderId = () => {
    return `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const processCheckout = async () => {
    setOrderStatus('processing');
    setSheetsStatus('saving');
    
    try {
      const newOrderId = generateOrderId();
      
      // Prepare order data for Google Sheets
      const orderData = {
        orderId: newOrderId,
        customer: {
          fullName: shippingInfo.fullName,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city
        },
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal: totalAmount,
        shippingCost: shippingCost,
        total: grandTotal,
        deliveryMethod: deliveryMethod
      };
      
      // Save to Google Sheets
      const sheetsResult = await saveOrderToGoogleSheets(orderData);
      
      if (sheetsResult.success) {
        setSheetsStatus('saved');
      } else {
        setSheetsStatus('error');
        console.warn('Google Sheets backup failed but order placed');
      }
      
      setOrderId(newOrderId);
      setOrderStatus('success');
      
      // Clear cart
      clearCart();
      
      return { 
        success: true, 
        orderId: newOrderId,
        sheetsStatus: sheetsStatus
      };
      
    } catch (error) {
      console.error('Checkout error:', error);
      setOrderStatus('error');
      setSheetsStatus('error');
      return { success: false, error: error.message };
    }
  };

  const value = {
    shippingInfo,
    updateShippingInfo,
    deliveryMethod,
    setDeliveryMethod,
    shippingCost,
    grandTotal,
    totalAmount,
    orderStatus,
    orderId,
    sheetsStatus,
    processCheckout
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};