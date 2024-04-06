const { OpenAI } = require("openai");
const express = require('express');
const cors = require('cors');

const openai = new OpenAI({apiKey: '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'});

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// POST route to handle image generation
app.post('/generate-image', async (req, res) => {
  const { background, people, objects } = req.body;
  prompt = "a white siamese cat"

  try {
    // Generate the image using Dall-E or similar service
    const imageUrl = await generateDalleImage(prompt);
    
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

async function generateDalleImage(prompt) {
  try {
    // Use the correct function name and ensure it matches the SDK's current version
    const response = await openai.images.generate({
      model: "dall-e-3", // Ensure this model name is correct
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    // Check if the response has data and that the array is not empty
    if (response.data && response.data.length > 0) {
      // Correct variable declaration
      const image_url = response.data[0].url; // Ensure this is how the response structure is
      console.log("Image URL:", image_url);
      return image_url; // Return the URL of the generated image
    } else {
      console.log("No image was generated.");
      return null;
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}