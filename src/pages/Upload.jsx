import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Upload = ({ onImageAnalyze }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    await onImageAnalyze(selectedImage);
    navigate('/recommendations');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/assets/Background.jpg)', // 👈 your background image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // semi-transparent white
          backdropFilter: 'blur(6px)',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#3c3c3c' }}>
          Upload an Outfit or Inspiration Image
        </Typography>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: '20px 0' }}
        />

        {selectedImage && (
          <Box my={2}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded"
              width="250"
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          onClick={handleAnalyze}
          disabled={!selectedImage}
          sx={{
            backgroundColor: '#673ab7',
            ':hover': { backgroundColor: '#5e35b1' },
            paddingX: 4,
            paddingY: 1.2,
            borderRadius: 2,
            fontWeight: 'bold',
          }}
        >
          Get Recommendations
        </Button>
      </Paper>
    </Box>
  );
};

export default Upload;