import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ProductPreview from './ProductPreview'
import ProductSelection from './ProductSelection'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  // Single state hook for the prompt
  const [prompt, setPrompt] = useState('');
  const [presets] = useState({
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
  const [generatedImage, setGeneratedImage] = useState({ url: '', prompt: '' }); // Updated state
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
      setPresetPrompt('Art');
  }, []);

  const generateImage = async () => {
    setIsGeneratingImage(true);
    const response = await fetch(BACKEND_URL + "/generateImage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
  
    if (response.ok) {
      const data = await response.json();
      setGeneratedImage({ url: data[0].url, prompt: prompt });
    } else {
      console.error('Failed to generate image');
      setIsGeneratingImage(false); // Set to false only if request fails
    }
  };
  

const setPresetPrompt = (presetKey) => {
  setImagePreview(`${presetImages[presetKey]}?t=${new Date().getTime()}`);
  setPrompt(presets[presetKey]);
  };

  const confirmImage = async () => {
    const response = await fetch(BACKEND_URL + "/uploadImage", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: generatedImage.url }),
    });

    if (response.ok) {
      const image = await response.json();
      // Handle successful image upload here
      console.log("Image successfully uploaded.");
      navigate('/productselection', { state: { image } });

    } else {
      console.error('Failed to upload image');
    }
  };

  return (
    <div className="App">
      <main>
        <section className="image-preview">
          <img
            src={generatedImage.url || imagePreview}
            alt="Generated"
            onLoad={() => setIsGeneratingImage(false)}
            className={isGeneratingImage ? 'image-loading' : ''}
          />
        </section>
        <section className="prompt-section">
          <textarea
            id="prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGeneratingImage}
            placeholder="Enter your description here..."
          />
          <div className="button-group">
            {Object.keys(presets).map((presetKey) => (
              <button
                key={presetKey}
                onClick={() => setPresetPrompt(presetKey)}
                disabled={isGeneratingImage}
                className={isGeneratingImage ? 'button-disabled' : ''}
              >
                {presetKey}
              </button>
            ))}
          </div>
          <div className="button-container">
          <button
            type="button"
            onClick={generateImage}
            disabled={isGeneratingImage}
            className={`generate-button ${isGeneratingImage ? 'button-disabled' : ''}`}
          >
            {isGeneratingImage ? "Generating..." : "Generate Image"}
            {isGeneratingImage && <div className="spinner"></div>}

          </button>
          {generatedImage.url && !isGeneratingImage && (
            <button
              type="button"
              onClick={confirmImage}
              className="confirm-button"
            >
              Confirm
            </button>
          )}
        </div>
        </section>
      </main>
    </div>
  );
}

function RouterWrappedApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/productpreview" element={<ProductPreview/>} />
        <Route path="/productselection" element={<ProductSelection/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterWrappedApp;
