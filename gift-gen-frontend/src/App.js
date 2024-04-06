import React, { useState } from 'react';
import './App.css';

const BACKEND_URL = "http://localhost:8000";

function App() {
  const [background, setBackground] = useState('');
  const [people, setPeople] = useState('');
  const [objects, setObjects] = useState('');
  const [imageSrc, setImageSrc] = useState('default.jpg'); // Initial image source

  // Handler for the Generate Image button click
  const generateImage = async () => {
    const response = await fetch(BACKEND_URL + "/generate-image", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ background, people, objects }),
    });

    if (response.ok) {
      const data = await response.json();
      // Use a timestamp or a unique identifier as a query parameter
      const uniqueTimestamp = new Date().getTime();
      const newImageUrl = `${data.imageUrl}?t=${uniqueTimestamp}`;
      setImageSrc(newImageUrl); // Update image source with the new URL
      console.log("Image generated successfully");
    } else {
      console.error('Failed to generate image');
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center' }}>
    
      <div style={{ display: 'inline-block', margin: '20px' }}>
        {/* Updated to use `imageSrc` state for image source */}
        <img src={imageSrc} alt="Generated" style={{ width: '50%', maxWidth: '800px', marginBottom: '20px' }} key={imageSrc}/>

        {/* Text fields and text boxes with added onChange handlers */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="background" style={{ marginRight: '10px' }}>Background</label>
          <input
            type="text"
            id="background"
            name="background"
            value={background} // Bind input value to state
            onChange={(e) => setBackground(e.target.value)} // Update state on change
            placeholder="A mystical forest on a starry night with a glowing moon"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="people" style={{ marginRight: '10px' }}>People</label>
          <input
            type="text"
            id="people"
            name="people"
            value={people} // Bind input value to state
            onChange={(e) => setPeople(e.target.value)} // Update state on change
            placeholder="A young indian boy and girl walking and holding hands"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="objects" style={{ marginRight: '10px' }}>Objects</label>
          <input
            type="text"
            id="objects"
            name="objects"
            value={objects} // Bind input value to state
            onChange={(e) => setObjects(e.target.value)} // Update state on change
            placeholder="Fairies floating in the air"
            style={{ width: '100%' }}
          />
        </div>
        
        <button
          type="button"
          onClick={generateImage}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Generate Image
        </button>
      </div>
    </div>
  );
}

export default App;
