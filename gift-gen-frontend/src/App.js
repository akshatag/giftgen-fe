import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const BACKEND_URL = "http://localhost:3000";

function App() {
  // Single state hook for the prompt
  const [prompt, setPrompt] = useState('');
  const [presets, setPresets] = useState({
    Art: 'A young Indian boy and girl walking in a mystical forest on a starry night under a glowing moon. They\'re holding hands and lovingly looking at each other. There are fairies floating in the air',
    Birthday: 'A blonde American boy with green eyes celebrating his 18th birthday with chocolate cake in realistic style',
    Anniversary: 'A cartoon of an Indian man and woman walking along central park on a sunny day with birds flying. They\'re holding hands and looking at each other lovingly',
    Graduation: 'An Italian woman walking down harvard business school tossing her graduation cap in the air',
    Religious: 'An abstract art depicting the colorful celebration of Holi with the text "Happy Holi"'
  });

  const presetImages = {
    Art: 'art.jpg',
    Birthday: 'birthday.jpg',
    Anniversary: 'anniversary.jpg',
    Graduation: 'graduation.jpg',
    Religious: 'religious.jpg',
  };
 
  const [imagePreview, setImagePreview] = useState(''); // State to hold the preset image for preview
  const [generatedImageURL, setGeneratedImageURL] = useState(''); // State to hold the generated image URL
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [showRenderButton, setShowRenderButton] = useState(false);

  useEffect(() => {
    // Set the default prompt to "Art" when the component mounts
    setPresetPrompt('Art');
  }, []);

  const generateImage = async () => {
    setIsGeneratingImage(true);
    // Send the prompt as the body of the POST request
    const response = await fetch(BACKEND_URL + "/generateImage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
      const data = await response.json();
      setGeneratedImageURL(data[0].url); 
    } else {
      console.error('Failed to generate image');
    }
    setIsGeneratingImage(false);
  };

const setPresetPrompt = (presetKey) => {
  setImagePreview(`${presetImages[presetKey]}?t=${new Date().getTime()}`);
  setPrompt(presets[presetKey]);
  };

  const uploadImage = async () => {
    const response = await fetch(BACKEND_URL + "/uploadImage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: generatedImageURL }),
    });

    if (response.ok) {
      const image = await response.json();
      // Handle successful image upload here
      console.log("Image successfully uploaded.");

      const createEndpoint = selectedItemType === "mug" ? "/createMug" : "/createPuzzle";
      const createResponse = await fetch(BACKEND_URL + createEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({image: image}),
      });
  
      if (createResponse.ok) {
        console.log(`Success creating ${selectedItemType}`);
        const image_urls = await createResponse.json();
        console.log("Product images returned.", image_urls);
        // Handle successful creation (e.g., display a confirmation message)
      } else {
        console.error(`Failed to create ${selectedItemType}`);
        // Handle error (e.g., display an error message)
      }
    } else {
      console.error('Failed to upload image');
    }
  };


  return (
    <div className="App" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
    <div style={{ textAlign: 'center' }}>
      <img
        src={generatedImageURL || imagePreview} // This will use generatedImageURL if it's truthy; otherwise, it falls back to imagePreview.
        alt="Generated"
        style={{ height: '500px', margin: '20px auto', display: 'block' }}
      />
    </div>
    <div style={{ margin: '0 auto', width: '80%', maxWidth: '800px' }}>
      <textarea
        id="prompt"
        name="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', height: '100px', marginBottom: '10px' }}
      />
      <div style={{ marginBottom: '10px' }}>
        {Object.keys(presets).map((presetKey) => (
          <button
            key={presetKey}
            onClick={() => setPresetPrompt(presetKey)}
            style={{ padding: '5px 10px', marginRight: '10px' }}
          >
            {presetKey}
          </button>
        ))}
      </div>
        <div>
          <button
            type="button"
            onClick={generateImage}
            disabled={isGeneratingImage}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: isGeneratingImage ? 'default' : 'pointer' }}
          >
            {isGeneratingImage ? "Hang tight. Generating image..." : "Generate Image"}
          </button>
        </div>
        {generatedImageURL && !isGeneratingImage && (
          <div>
            <div>
              <label style={{ marginRight: '10px' }}>Choose gift type:</label>
              <label style={{ marginRight: '10px' }}>
                <input
                  type="radio"
                  name="itemType"
                  value="mug"
                  checked={selectedItemType === "mug"}
                  onChange={() => setSelectedItemType("mug")}
                />
                Mug
              </label>
              <label>
                <input
                  type="radio"
                  name="itemType"
                  value="puzzle"
                  checked={selectedItemType === "puzzle"}
                  onChange={() => setSelectedItemType("puzzle")}
                />
                Puzzle
              </label>
            </div>
            {selectedItemType && (
              <div>
                <button onClick={uploadImage}>Render Gift</button> 
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
