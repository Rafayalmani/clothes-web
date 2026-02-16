// src/components/OrderForm.jsx
import React, { useState } from 'react';

const OrderForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    productName: '',
    price: '',
    quantity: 1
  });

  // 🔴 REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT URL
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbw8xTH9_twZGFIoql14aUduZBfgfZ_YKvX5rYv4D9Mod3RaNErE2usyG-Dx-IShnaNr/exec';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveToGoogleSheets = async (orderData) => {
    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors', // This is important for Google Sheets
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      // With no-cors, we can't read response, so assume success
      return { success: true };
      
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      return { success: false, error: error.message };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Generate order ID
    const orderId = 'ORD-' + Date.now();

    const orderData = {
      orderId: orderId,
      customerName: formData.customerName,
      email: formData.email,
      productName: formData.productName,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      timestamp: new Date().toISOString()
    };

    console.log('Sending order:', orderData);

    // Save to Google Sheets
    const result = await saveToGoogleSheets(orderData);

    if (result.success) {
      alert(`✅ Order placed successfully!\nOrder ID: ${orderId}`);
      // Reset form
      setFormData({
        customerName: '',
        email: '',
        productName: '',
        price: '',
        quantity: 1
      });
    } else {
      alert('❌ Error placing order. Check console.');
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Place Order</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="customerName"
                    className="form-control"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    className="form-control"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Price (Rs)</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="100"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    min="1"
                    max="10"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </form>

              <div className="alert alert-info mt-3 small">
                <i className="bi bi-info-circle me-2"></i>
                Your order will be saved to Google Sheets
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;