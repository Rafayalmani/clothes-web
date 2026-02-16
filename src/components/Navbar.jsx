// src/components/Navbar.jsx (Updated with Logo)
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <motion.nav 
      className="navbar navbar-expand-lg navbar-light bg-light"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        {/* Logo and Brand */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="/logo.png" 
            alt="SuitStudio" 
            height="40" 
            className="me-2"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
          <span className="fw-bold" style={{ color: 'black' }}>Zayora</span>
        
        </NavLink>
        
        <div className="d-flex align-items-center order-lg-3">
          {/* Mobile Cart Icon */}
          <NavLink 
            to="/cart" 
            className="nav-link position-relative d-lg-none me-3"
          >
            <i className="bi bi-cart3 fs-5"></i>
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        
        <div className="collapse navbar-collapse order-lg-2" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                } 
                to="/"
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                } 
                to="/shop"
              >
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                } 
                to="/new-arrivals"
              >
                New Arrivals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                } 
                to="/sale"
              >
                <span className="text-danger">Sale</span>
              </NavLink>
            </li>
          </ul>
          
          {/* Desktop Cart Icon */}
          <ul className="navbar-nav d-none d-lg-block">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  isActive ? 'nav-link active position-relative' : 'nav-link position-relative'
                } 
                to="/cart"
              >
                Cart
                {totalItems > 0 && (
                  <motion.span 
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;