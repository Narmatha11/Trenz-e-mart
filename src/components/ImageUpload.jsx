import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';

const ImageUpload = ({ onImageAnalyze }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = () => {
    if (!image) return;
    onImageAnalyze(image); // Call the parent function
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>Upload Inspiration Image</Typography>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginTop: '1rem' }}
      />

      {preview && (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle1">Preview:</Typography>
          <img
            src={preview}
            alt="Uploaded Outfit"
            style={{ maxWidth: '100%', borderRadius: 8, marginTop: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAnalyze}
          >
            Find Similar Outfits
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default ImageUpload;