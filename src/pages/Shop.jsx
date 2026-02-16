// src/pages/Shop.jsx (Mobile Responsive & Styled)
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Shop = () => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  // Filter products
  const filteredProducts = products.filter(product => {
    if (category && product.category !== category) return false;
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        if (product.price < min || product.price > max) return false;
      } else {
        if (product.price < min) return false;
      }
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // default
  });

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <motion.div 
      className="py-4 py-md-5"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        {/* Page Title */}
        <motion.h1 
          className="text-center mb-4 mb-md-5"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 'bold',
            color: '#333'
          }}
        >
          Shop Women's Collection
        </motion.h1>

        {/* Filter Bar - Mobile Friendly */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="bg-light p-3 p-md-4 rounded-3 shadow-sm">
              
              {/* Mobile Filter Toggle */}
              <div className="d-flex d-md-none justify-content-between align-items-center mb-3">
                <button 
                  className="btn btn-outline-dark w-100"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <i className={`bi bi-${showFilters ? 'chevron-up' : 'chevron-down'} me-2`}></i>
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>

              {/* Filter Options - Collapsible on Mobile */}
              <AnimatePresence>
                {(showFilters || window.innerWidth >= 768) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="row g-3 align-items-end">
                      <div className="col-md-2 d-none d-md-block">
                        <span className="fw-bold text-muted">Filter by:</span>
                      </div>
                      
                      {/* Category Filter */}
                      <div className="col-12 col-md-3">
                        <label className="form-label d-md-none fw-bold">Category</label>
                        <select 
                          className="form-select form-select-lg rounded-pill border-0 shadow-sm"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          style={{ backgroundColor: 'white' }}
                        >
                          <option value="">All Categories</option>
                          <option value="dresses">Dresses</option>
                          <option value="tops">Tops & Blouses</option>
                          <option value="bottoms">Bottoms</option>
                          <option value="accessories">Accessories</option>
                          <option value="footwear">Footwear</option>
                        </select>
                      </div>

                      {/* Price Range Filter */}
                      <div className="col-12 col-md-3">
                        <label className="form-label d-md-none fw-bold">Price Range</label>
                        <select 
                          className="form-select form-select-lg rounded-pill border-0 shadow-sm"
                          value={priceRange}
                          onChange={(e) => setPriceRange(e.target.value)}
                          style={{ backgroundColor: 'white' }}
                        >
                          <option value="">All Prices</option>
                          <option value="0-2000">Under Rs. 2,000</option>
                          <option value="2000-5000">Rs. 2,000 - 5,000</option>
                          <option value="5000-10000">Rs. 5,000 - 10,000</option>
                          <option value="10000">Over Rs. 10,000</option>
                        </select>
                      </div>

                      {/* Sort By */}
                      <div className="col-12 col-md-3">
                        <label className="form-label d-md-none fw-bold">Sort By</label>
                        <select 
                          className="form-select form-select-lg rounded-pill border-0 shadow-sm"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          style={{ backgroundColor: 'white' }}
                        >
                          <option value="default">Default</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="name">Name: A to Z</option>
                        </select>
                      </div>

                      {/* Clear Filters Button */}
                      <div className="col-12 col-md-1">
                        <button 
                          className="btn btn-outline-secondary rounded-pill w-100 mt-2 mt-md-0"
                          onClick={() => {
                            setCategory('');
                            setPriceRange('');
                            setSortBy('default');
                          }}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          <i className="bi bi-x-circle me-1"></i>
                          <span className="d-none d-md-inline">Clear</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Count - Always Visible */}
              <div className="row mt-3">
                <div className="col-12">
                  <p className="text-muted mb-0 small">
                    <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                    {sortedProducts.length} products found
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row g-3 g-md-4">
          <AnimatePresence>
            {sortedProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                className="col-6 col-md-4 col-lg-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <motion.div 
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-4">
              <i className="bi bi-search" style={{ fontSize: '4rem', color: '#ccc' }}></i>
            </div>
            <h3 className="mb-3">No products found</h3>
            <p className="text-muted mb-4">Try adjusting your filters or browse all products</p>
            <button 
              className="btn btn-dark btn-lg rounded-pill px-5"
              onClick={() => {
                setCategory('');
                setPriceRange('');
                setSortBy('default');
              }}
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Load More Button (Optional) */}
        {sortedProducts.length > 8 && (
          <div className="text-center mt-5">
            <button className="btn btn-outline-dark btn-lg rounded-pill px-5">
              Load More Products
            </button>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
        @media (max-width: 576px) {
          .form-select-lg {
            font-size: 0.9rem;
            padding: 0.6rem 1rem;
          }
          
          .btn-lg {
            padding: 0.6rem 1.5rem;
            font-size: 0.9rem;
          }
          
          h1 {
            margin-bottom: 1rem !important;
          }
        }

        @media (min-width: 577px) and (max-width: 768px) {
          .col-md-4 {
            flex: 0 0 auto;
            width: 50%;
          }
        }

        /* Smooth transitions */
        .form-select, .btn {
          transition: all 0.3s ease;
        }

        .form-select:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1) !important;
        }

        .btn-outline-dark:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        /* Filter bar styling */
        .bg-light {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
        }

        /* Product grid spacing */
        .g-3 {
          --bs-gutter-y: 1rem;
        }

        @media (max-width: 768px) {
          .g-3 {
            --bs-gutter-y: 0.75rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Shop;