import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const categoryProducts = {
  electronics: [
   
    {
      name: "AirPods Pro",
      price: "₹19,999",
      image: "/assets/Headphone.jpg",
      rating: 4.7,
    },
 {
      name: "LED TV",
      price: "₹79,999",
      image: "Ledtv",
      rating: 4.8,
    },
 {
      name: "Smart Watch",
      price: "₹3,999",
      image: "/assets/Sm.jpg",
      rating: 4.8,
    },
  ],
  fashion: [
    {
      name: "Men's Casual Shirt",
      price: "₹599",
      image: "/assets/Mencasual.jpg",
      rating: 4.5,
    },
    {
      name: "Women’s Top",
      price: "₹499",
      image: "/assets/Shop.jpg",
      rating: 4.3,
    },
  ],
mobiles:  [
 {
      name: "iPhone 14",
      price: "₹79,999",
      image: "/assets/Iphone.jpg",
      rating: 4.8,
    },
],
home:  [
 {
      name: "Sofa Set",
      price: "₹49,999",
      image: "/assets/Sofa.jpg",
      rating: 4.8,
    },
],
beauty:  [
 {
      name: "Full Makeup Set",
      price: "₹999",
      image: "/assets/Makeup.jpg",
      rating: 4.8,
    },
],
  // Add more categories...
};

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const products = categoryProducts[categoryName.toLowerCase()] || [];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia component="img" height="200" image={product.image} alt={product.name} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="textSecondary">{product.price}</Typography>
                <Typography color="textSecondary">⭐ {product.rating}</Typography>
                <Button variant="contained" sx={{ mt: 1 }}>Add to Cart</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryProducts;