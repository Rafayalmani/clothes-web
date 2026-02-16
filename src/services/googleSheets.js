// src/services/googleSheets.js
// Google Sheets integration service

// 🔴 REPLACE WITH YOUR ACTUAL GOOGLE SHEETS URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzYskmeuGRCB2oXufHJ1cKvZBF2I8W1uJd5Rbus5B6jR0R0fCLq7YKSkrHIo6L8vaSW/exec';

export const saveOrderToGoogleSheets = async (orderData) => {
  try {
    console.log('📤 Saving order to Google Sheets:', orderData);
    
    // Format products as readable string
    const productsList = orderData.items.map(item => 
      `${item.name} (${item.quantity}x Rs.${item.price})`
    ).join(' | ');
    
    // Prepare data for Google Sheets
    const sheetData = {
      timestamp: new Date().toLocaleString(),
      orderId: orderData.orderId,
      customerName: orderData.customer.fullName,
      email: orderData.customer.email,
      phone: orderData.customer.phone,
      address: orderData.customer.address,
      city: orderData.customer.city,
      products: productsList,
      subtotal: orderData.subtotal,
      shippingCost: orderData.shippingCost,
      total: orderData.total,
      paymentMethod: 'Cash on Delivery',
      deliveryMethod: orderData.deliveryMethod
    };

    // Send to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors', // Important for Google Sheets
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData)
    });

    console.log('✅ Order sent to Google Sheets');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Google Sheets Error:', error);
    return { success: false, error: error.message };
  }
};