// src/OrderSuccess.js

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <Box
      sx={{
        mt: 8,
        p: 4,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 100, color: 'green', mb: 3 }} />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Order Placed Successfully!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Thank you for your purchase. Your order has been confirmed.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleContinueShopping}
      >
        Continue Shopping
      </Button>
    </Box>
  );
}

export default OrderSuccess;