
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function ConfirmOrder() {
  const [product, setProduct] = useState(null);
  const quantity = 1;
  const navigate = useNavigate();

  useEffect(() => {
    const storedProduct = localStorage.getItem('productToConfirm');

    if (storedProduct) {
      try {
        const parsedProduct = JSON.parse(storedProduct);
        setProduct(parsedProduct);
      } catch (error) {
        console.error(
          'Failed to parse product for order confirmation:',
          error
        );
        setProduct(null);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmitOrder = () => {
    if (!product) {
      alert('No product to confirm order for!');
      return;
    }

    console.log(
      'Submitting order for:',
      product.name,
      'Quantity:',
      quantity
    );

    alert(
      `Order for ${product.name} submitted! (This is a mock submission)`
    );

    localStorage.removeItem('productToConfirm');
    navigate('/ordersuccess');
  };

  if (!product) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography>Loading order details...</Typography>
      </Box>
    );
  }

  const price =
    typeof product.price === 'number'
      ? product.price
      : parseFloat(
          String(product.price ?? '')
            .replace('₹', '')
            .replace(/,/g, '')
        ) || 0;

  const total = (price * quantity).toFixed(2);

  return (
    <Box sx={{ mt: 4, p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        Confirm Your Order
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <img
              src={product.image}
              alt={product.name || 'Product'}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '4px',
              }}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Typography variant="h5" fontWeight="bold">
              {product.name}
            </Typography>

            <Typography variant="h6" color="text.secondary">
              Price: {product.price}
            </Typography>

            <Typography variant="body1">
              Quantity: {quantity}
            </Typography>

            <Typography variant="h5" color="primary" mt={2}>
              Total: ₹{total}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, textAlign: 'center' }}
      >
        *This is a mock order confirmation. No actual purchase will be made.
      </Typography>

      <Button
        variant="contained"
        color="success"
        size="large"
        fullWidth
        onClick={handleSubmitOrder}
      >
        Submit Order
      </Button>
    </Box>
  );
}

export default ConfirmOrder;
