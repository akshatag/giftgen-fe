import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ProductSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state || {};

  const handleProductClick = async (selectedItemType) => {
    const createEndpoint = selectedItemType === "mug" ? "/createMug" : "/createPuzzle";
    const createResponse = await fetch(BACKEND_URL + createEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: image }),
    });
    if (createResponse.ok) {
      console.log(`Success creating ${selectedItemType}`);
      const jsonResponse = await createResponse.json();
      console.log("JSON RESPONSE FROM PRINTIFY IS", jsonResponse);
      if (jsonResponse.images && Array.isArray(jsonResponse.images)) {
        const imageUrls = jsonResponse.images.map(imageObj => imageObj.src);
        const productId = jsonResponse.id
        // This is where you navigate to ProductPreview, passing the imageUrls as state
        navigate('/productPreview', { state: { productId: productId, images: imageUrls } });
      } else {
        console.error('Invalid format for image URLs');
        // Optionally handle invalid format for image URLs
      }
    } else {
      console.error(`Failed to create ${selectedItemType}`);
      // Optionally handle request failure
    }
  };
  
  const handleBack = () => {
    navigate(-1); // This will take the user back to the previous page in the history stack
  };
 // Updated styling
 const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff', // A clean white background
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    color: '#333',
    paddingBottom: '2rem',
  };

  // Button style unchanged
  const buttonStyle = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    outline: 'none',
  };

  // Image style unchanged
  const imageStyle = {
    width: '300px',
    height: 'auto',
    transition: 'transform 0.3s ease',
  };

  // Label style unchanged
  const labelStyle = {
    textAlign: 'center',
    color: '#333',
    marginTop: '0.5rem',
    fontWeight: 'bold',
    fontSize: '1rem'
  };

  // Back button moved to the left and modernized
  const backButtonStyle = {
    position: 'fixed', // Use fixed to position it relative to the viewport
    top: '20px',
    left: '20px',
    fontSize: '1rem',
    fontWeight: 'bold', // Make the font bold
    color: '#333',
    backgroundColor: '#f7f7f7', // A light grey that matches the button hover
    border: 'none', // Removing border for a modern flat design
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // A subtle shadow for depth
    transition: 'background-color 0.3s ease', // Transition for a smooth color change on hover
  };

  return (
    <div style={containerStyle}>
     <button onClick={handleBack} style={backButtonStyle}>Back</button>

      <div>
        <button onClick={() => handleProductClick('mug')} style={buttonStyle}>
          <img src={`${process.env.PUBLIC_URL}/mug.webp`} alt="Mug" style={imageStyle} />
          <p style={labelStyle}>Mug</p>
        </button>
        <button onClick={() => handleProductClick('puzzle')} style={buttonStyle}>
          <img src={`${process.env.PUBLIC_URL}/puzzle.jpg`} alt="Puzzle" style={imageStyle} />
          <p style={labelStyle}>Puzzle</p>
        </button>
      </div>

      <style>{`
        button:hover {
          background-color: #f7f7f7; // Light grey background on hover for the buttons
          transition: background-color 0.3s ease;
        }
        button:hover img {
          transform: scale(1.05);
          opacity: 0.8;
        }
        button:hover p {
          color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default ProductSelection;