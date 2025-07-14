import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const ProductCard = ({ product }) => (
  <Card sx={{ maxWidth: 250, m: 2 }}>
    <CardMedia component="img" height="200" image={product.image} alt={product.name} />
    <CardContent>
      <Typography variant="h6">{product.name}</Typography>
      <Typography variant="body2" color="text.secondary">₹{product.price}</Typography>
      <Button variant="outlined" fullWidth sx={{ mt: 1 }}>Add to Wishlist</Button>
    </CardContent>
  </Card>
);

export default ProductCard;