const express = require('express');
const cors = require('cors');
const app = express();


// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Mock function to simulate image generation
const generateDalleImage = async (background, people, objects) => {
  // Your image generation logic goes here.
  // For the sake of this example, we will just return a placeholder URL.
  return `https://source.unsplash.com/random`; // Placeholder for the generated image URL
};

// POST route to handle image generation
app.post('/generate-image', async (req, res) => {
  const { background, people, objects } = req.body;

  try {
    // Generate the image using Dall-E or similar service
    const imageUrl = await generateDalleImage(background, people, objects);
    
    // Send back the URL to the generated image
    res.json({ imageUrl });
  } catch (error) {
    // Handle errors appropriately
    console.error('Error generating image:', error);
    res.status(500).send('An error occurred while generating the image');
  }
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
