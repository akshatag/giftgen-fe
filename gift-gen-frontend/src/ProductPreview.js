import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ImageCarousel({ images }) {
  return (
    <div style={{
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: '20px 0',
    }}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          style={{
            height: '500px',
            margin: '0 10px',
            display: 'inline-block',
          }}
        />
      ))}
    </div>
  );
}

function ProductPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const images = location.state?.images; // Assume images array is passed via state
  const productId = location.state?.productId; // Assume images array is passed via state

  // Function to handle redirect to payment
  const redirectToPayment = () => {
    window.location.href = 'https://buy.stripe.com/test_7sI9CUfif7PKaHu4gg?client_reference_id='+productId;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, padding: '20px' }}>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <h1>Product Preview</h1>
      {images && <ImageCarousel images={images} />}
      <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
        <button
          onClick={redirectToPayment}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

export default ProductPreview;
