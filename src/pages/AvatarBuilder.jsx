import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AvatarBuilder = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Build Your Avatar
      </Typography>

      <Box
        sx={{
          width: '100%',
          height: '600px',
          border: '2px solid #ccc',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <iframe
          src="https://mobile.metaperson.avatarsdk.com/generator"
          width="100%"
          height="100%"
          title="Avatar Generator"
          frameBorder="0"
          allowFullScreen
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" gutterBottom>
          After customizing your avatar, you can download or screenshot it and upload it in the try-on section.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/tryon')}>
          Go to Try-On
        </Button>
      </Box>
    </Box>
  );
};

export default AvatarBuilder;