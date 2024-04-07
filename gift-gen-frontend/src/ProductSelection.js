import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const BACKEND_URL = "http://localhost:3000";

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

   // Add some styling to make the UI more aesthetically pleasing
   const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7', // A light grey background for contrast
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', // A more modern font
  };

  const titleStyle = {
    margin: '0',
    color: '#333', // Dark grey color for the text
    paddingBottom: '2rem', // Add some space below the title
  };

  const buttonStyle = {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    outline: 'none', // Remove outline on focus for a cleaner look
  };

  const imageStyle = {
    width: '200px',
    height: 'auto',
    transition: 'transform 0.3s ease', // Smooth transition for the hover effect
  };

  const labelStyle = {
    textAlign: 'center',
    color: '#333', // Match the text color with the title
    marginTop: '0.5rem', // Space between image and label
  };

  const backButtonStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    fontSize: '1rem',
    color: '#333',
    backgroundColor: 'transparent',
    border: '1px solid #ccc', // A subtle border
    borderRadius: '5px', // Rounded corners
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    textDecoration: 'none', // Remove underline from text
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleBack} style={backButtonStyle}>
        Back
      </button>
      <h1 style={titleStyle}>Choose your product</h1>
      <div>
        <button onClick={() => handleProductClick('mug')} style={buttonStyle}>
          <img src={`${process.env.PUBLIC_URL}/mug.jpg`} alt="Mug" style={imageStyle} />
          <p style={labelStyle}>Mug</p>
        </button>
        <button onClick={() => handleProductClick('puzzle')} style={buttonStyle}>
          <img src={`${process.env.PUBLIC_URL}/puzzle.jpg`} alt="Puzzle" style={imageStyle} />
          <p style={labelStyle}>Puzzle</p>
        </button>
      </div>

      {/* Style to be applied on hover */}
      <style>{`
        button:hover img {
          transform: scale(1.05); // Slightly enlarge the image
          opacity: 0.8; // Slightly fade the image to give focus
        }
        button:hover p {
          color: #007bff; // Highlight the text with a blue color
        }
      `}</style>
    </div>
  );
};

export default ProductSelection;