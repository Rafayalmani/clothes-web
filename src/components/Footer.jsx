// src/components/Footer.jsx (Updated with Designer Credit)
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-dark text-white mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        paddingTop: 'clamp(2rem, 5vw, 3rem)',
        paddingBottom: 'clamp(1rem, 3vw, 1.5rem)'
      }}
    >
      <div className="container">
        <div className="row g-4 g-md-5">
          {/* Brand Column - Full width on mobile */}
          <div className="col-12 col-md-6">
            <div className="text-center text-md-start">
              <h5 className="fw-bold mb-3" style={{ 
                fontSize: 'clamp(1.25rem, 4vw, 1.5rem)'
              }}>
                Zayora
              </h5>
              <p className="text-white-50 mb-3" style={{
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                lineHeight: '1.6',
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                Your premier destination for the latest fashion trends and timeless classics.
              </p>
              <div className="d-flex justify-content-center justify-content-md-start gap-3">
                <motion.a 
                  href="#" 
                  className="text-white-50"
                  whileHover={{ scale: 1.2, color: '#ffffff' }}
                >
                  <i className="bi bi-facebook" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-white-50"
                  whileHover={{ scale: 1.2, color: '#ffffff' }}
                >
                  <i className="bi bi-instagram" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-white-50"
                  whileHover={{ scale: 1.2, color: '#ffffff' }}
                >
                  <i className="bi bi-twitter-x" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-white-50"
                  whileHover={{ scale: 1.2, color: '#ffffff' }}
                >
                  <i className="bi bi-pinterest" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}></i>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Contact Info - Full width on mobile */}
          <div className="col-12 col-md-6">
            <div className="text-center text-md-start">
              <h6 className="fw-bold mb-3" style={{ 
                fontSize: 'clamp(1rem, 3.5vw, 1.1rem)'
              }}>
                Contact Us
              </h6>
              <ul className="list-unstyled">
                <li className="mb-3 text-white-50 d-flex align-items-center justify-content-center justify-content-md-start">
                  <i className="bi bi-envelope me-2 flex-shrink-0"></i>
                  <span style={{ 
                    fontSize: 'clamp(0.875rem, 3vw, 0.95rem)',
                    wordBreak: 'break-all'
                  }}>
                    almanidotcompany@gmail.com
                  </span>
                </li>
                <li className="mb-3 text-white-50 d-flex align-items-center justify-content-center justify-content-md-start">
                  <i className="bi bi-telephone me-2 flex-shrink-0"></i>
                  <span style={{ fontSize: 'clamp(0.875rem, 3vw, 0.95rem)' }}>
                    +92 (315) 508 9965
                  </span>
                </li>
                <li className="mb-2 text-white-50 d-flex align-items-center justify-content-center justify-content-md-start">
                  <i className="bi bi-geo-alt me-2 flex-shrink-0"></i>
                  <span style={{ 
                    fontSize: 'clamp(0.875rem, 3vw, 0.95rem)',
                    maxWidth: '250px'
                  }}>
                    Islamabad, Pakistan
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-4 mt-md-5 pt-4 border-top border-secondary">
          <div className="col-12 text-center">
            <p className="text-white-50 mb-0" style={{ 
              fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)'
            }}>
              &copy; {currentYear} Zayora. All rights reserved.
            </p>
          </div>
        </div>

        {/* Designer Credit - Added Here */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="text-white-50 small mb-0" style={{
              fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
              opacity: '0.8'
            }}>
              Designed & Developed with <span style={{ color: '#ff4d4d' }}>❤</span> by Rafay Almani
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 576px) {
          .footer {
            padding-left: 15px;
            padding-right: 15px;
          }
          
          .border-top {
            margin-top: 2rem !important;
            padding-top: 1.5rem !important;
          }
        }

        @media (min-width: 577px) and (max-width: 768px) {
          .container {
            max-width: 100%;
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        /* Hover effects for touch devices */
        @media (hover: hover) {
          .text-white-50:hover {
            color: #ffffff !important;
            transition: color 0.3s ease;
          }
        }

        /* Better touch targets for mobile */
        @media (max-width: 768px) {
          .list-unstyled li {
            padding: 8px 0;
          }
          
          .d-flex.gap-3 a {
            padding: 8px;
            min-width: 44px;
            min-height: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* Smooth transitions */
        .text-white-50 {
          transition: color 0.3s ease;
        }
        
        /* Heart animation */
        .text-white-50 span {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        
        .text-white-50:hover span {
          transform: scale(1.2);
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;