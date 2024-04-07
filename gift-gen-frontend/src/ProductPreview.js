import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ImageCarousel({ images }) {
  const imageCarouselStyle = {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    padding: '20px 0',
  };

  const imageStyle = {
    height: '500px',
    margin: '0 10px',
    display: 'inline-block',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Adding a shadow for depth
    borderRadius: '5px', // Rounded corners for images
  };

  return (
    <div style={imageCarouselStyle}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          style={imageStyle}
        />
      ))}
    </div>
  );
}

function ProductPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const images = location.state?.images;
  const productId = location.state?.productId;

  const redirectToPayment = () => {
    window.location.href = 'https://buy.stripe.com/test_7sI9CUfif7PKaHu4gg?client_reference_id=' + productId;
  };

  const backButtonStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f7f7f7',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
  };

  const paymentButtonStyle = {
    backgroundColor: "#4CAF50", // Using a blue color for primary action
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s ease',
  };

  const containerStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    padding: '20px',
    height: '100vh',
  };

  const titleStyle = {
    color: '#333',
    marginBottom: '2rem',
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>Back</button>
      <h1 style={titleStyle}>Product Preview</h1>
      {images && <ImageCarousel images={images} />}
      <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
        <button
          onClick={redirectToPayment}
          style={paymentButtonStyle}
        >
          Continue to Payment
        </button>
      </div>

      {/* Hover styles for buttons */}
      <style>{`
        button:hover {
          background-color: #e7e7e7; // A lighter shade on hover
        }
      `}</style>
    </div>
  );
}

export default ProductPreview;
