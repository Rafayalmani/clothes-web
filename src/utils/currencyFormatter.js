// src/utils/currencyFormatter.js
export const CURRENCY = {
  symbol: 'Rs',
  code: 'PKR'
};

export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return `${CURRENCY.symbol} 0`;
  }
  return `${CURRENCY.symbol} ${Number(price).toFixed(0)}`;
};