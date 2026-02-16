// src/components/ProductImage.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProductImage = ({ src, alt, className, style, aspectRatio = '1/1' }) => {
  const [imageError, setImageError] = useState(false);

  // Fallback image if the main image fails to load
  const fallbackImage = '/images/placeholder.jpg';

  const handleImageError = () => {
    console.log(`Image failed to load: ${src}`);
    setImageError(true);
  };

  return (
    <div 
      className={`image-container overflow-hidden ${className || ''}`}
      style={{ 
        position: 'relative',
        width: '100%',
        aspectRatio: aspectRatio,
        ...style 
      }}
    >
      <img
        src={imageError ? fallbackImage : src}
        alt={alt}
        onError={handleImageError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', // This makes the image fit perfectly in the box
          objectPosition: 'center',
          display: 'block'
        }}
        loading="lazy"
      />
    </div>
  );
};

ProductImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  aspectRatio: PropTypes.string
};

export default ProductImage;