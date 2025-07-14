// src/TryOn.js

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Grid, Paper, CircularProgress } from '@mui/material';
import { Rnd } from 'react-rnd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

let uniqueIdCounter = 0;
const generateUniqueId = () => {
    uniqueIdCounter += 1;
    return `overlay-${Date.now()}-${uniqueIdCounter}`;
};

const dummyProducts = [
  { name: 'pink', image: '/assets/pink.jpg', type: 'dress' },
  { name: 'Watch', image: '/assets/watch.jpg', type: 'watch' },
  { name: 'Jacky', image: '/assets/Jacky.jpg', type: 'dress' },
  { name: 'green', image: '/assets/green.jpg', type: 'shirt' },
  { name: 'Sunglass', image: '/assets/Sunglass.jpg', type: 'glasses' },
  { name: 'Sherwani', image: '/assets/sherwani.jpg', type: 'sherwani' },
];

const TryOn = () => {
  const [avatarImage, setAvatarImage] = useState(null);
  const [overlays, setOverlays] = useState([]);
  const [loading, setLoading] = useState(false);
  const avatarRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const storedProduct = localStorage.getItem('virtualProduct');
    if (storedProduct) {
      try {
        const productFromLocalStorage = JSON.parse(storedProduct);

        if (!productFromLocalStorage.style) {
          productFromLocalStorage.style = {
            top: 100,
            left: 100,
            width: 120,
            height: 150,
          };
        }
        if (!productFromLocalStorage.id) {
            productFromLocalStorage.id = generateUniqueId();
        }

        setOverlays([productFromLocalStorage]);
        localStorage.removeItem('virtualProduct');
      } catch (error) {
        console.error("Failed to parse virtual product from localStorage:", error);
        localStorage.removeItem('virtualProduct');
      }
    }
  }, []);

  const handleAvatarUpload = (e) => {
    if (e.target.files[0]) {
      const imageURL = URL.createObjectURL(e.target.files[0]);
      setAvatarImage(imageURL);
      // If you want products to persist when new avatar is uploaded, keep this commented
      // setOverlays([]);
    }
  };

  const runAutoFit = () => {
    const mockFitPoints = {
      wrist: { x: 280, y: 350 },
      torso: { x: 200, y: 200 },
      hip: { x: 200, y: 400 },
      face: { x: 200, y: 100 },
    };

    if (!avatarImage || overlays.length === 0) {
      console.warn("Cannot perform auto-fit: No avatar uploaded or no products to fit.");
      return;
    }

    setOverlays(prevOverlays =>
      prevOverlays.map(item => {
        let point;
        let targetWidth, targetHeight, offsetX, offsetY;

        switch (item.type) {
          case 'watch':
            point = mockFitPoints.wrist;
            targetWidth = 70;
            targetHeight = 70;
            offsetX = targetWidth / 2;
            offsetY = targetHeight / 2;
            break;
          case 'dress':
            point = mockFitPoints.torso;
            targetWidth = 200;
            targetHeight = 300;
            offsetX = targetWidth / 2;
            offsetY = 30;
            break;
          case 'pants':
            point = mockFitPoints.hip;
            targetWidth = 180;
            targetHeight = 250;
            offsetX = targetWidth / 2;
            offsetY = 50;
            break;
          case 'shirt':
            point = mockFitPoints.torso;
            targetWidth = 180;
            targetHeight = 200;
            offsetX = targetWidth / 2;
            offsetY = 20;
            break;
          case 'glasses':
            point = mockFitPoints.face;
            targetWidth = 120;
            targetHeight = 50;
            offsetX = targetWidth / 2;
            offsetY = targetHeight / 2;
            break;
          case 'sherwani':
            point = mockFitPoints.torso;
            targetWidth = 220;
            targetHeight = 400;
            offsetX = targetWidth / 2;
            offsetY = 50;
            break;
          default:
            point = mockFitPoints.torso;
            targetWidth = 100;
            targetHeight = 150;
            offsetX = targetWidth / 2;
            offsetY = targetHeight / 2;
            console.warn(`Unknown product type: ${item.type}. Using default fit.`);
            break;
        }

        const newLeft = point.x - offsetX;
        const newTop = point.y - offsetY;

        return {
          ...item,
          style: {
            left: Math.max(0, Math.min(newLeft, 400 - targetWidth)),
            top: Math.max(0, Math.min(newTop, 600 - targetHeight)),
            width: targetWidth,
            height: targetHeight
          }
        };
      })
    );
  };

  const handleOverlay = (product) => {
    setOverlays(prev => [
      ...prev,
      {
        ...product,
        id: product.id || generateUniqueId(),
        style: {
          top: 100,
          left: 100,
          width: 120,
          height: 150,
        },
      }
    ]);
  };

  const handleClearOverlays = () => {
    setOverlays([]);
  };
  const handleCreateAvatar = () => {
    // Opens the MetaPerson avatar generator in a new tab
    window.open('https://mobile.metaperson.avatarsdk.com/generator', '_blank');
  };

  // NEW: Handle Buy Now button click
  const handleBuyNow = () => {
    if (overlays.length > 0) {
      // For simplicity, take the first product in overlays
      // In a real app, you might have a selection mechanism or a shopping cart
      const productToBuy = overlays[0];
      localStorage.setItem('productToConfirm', JSON.stringify(productToBuy));
      navigate('/confirmorder');
    } else {
      alert("Please select a product to buy!");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f4f6f8', p: 4 }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
        Virtual Try-On (Mock Test)
      </Typography>

      <Box textAlign="center" mb={3}>
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />
      </Box>

      <Box display="flex" justifyContent="center" mt={2} position="relative">
        <Paper
          sx={{
            height: 600,
            width: 400,
            position: 'relative',
            border: '2px solid #ccc',
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#fff',
            zIndex: 1,
          }}
        >
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 20,
                background: 'rgba(255,255,255,0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress size={50} color="secondary" />
            </Box>
          )}

          {avatarImage ? (
            <img
              id="avatar-img"
              ref={avatarRef}
              src={avatarImage}
              alt="Avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2,
              }}
            />
          ) : (
            <Typography variant="body1" textAlign="center" mt={10}>
              Upload Your Avatar
            </Typography>
          )}
          {/* New Button for MetaPerson Avatar Creation */}
                <Box sx={{ textAlign: 'center', my: 2 }}> {/* Added Box for centering and margin */}
                  <Button
                    variant="contained"
                    size="medium" // Adjusted size for better fit
                    sx={{
                      backgroundColor: '#673ab7', // Deep purple, consistent with TryOn page
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#5e35b1', // Slightly darker purple on hover
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      },
                      padding: '10px 20px',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      textTransform: 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                    onClick={handleCreateAvatar}
                  >
                    Create Your Avatar with MetaPerson
                  </Button>
                </Box>

          {overlays.map((item) => (
            <Rnd
              key={item.id}
              position={{ x: item.style.left, y: item.style.top }}
              size={{ width: item.style.width, height: item.style.height }}
              bounds="parent"
              enableResizing
              onDragStop={(e, d) => {
                console.log("Drag stopped. New position:", d.x, d.y);
                setOverlays(prev =>
                  prev.map((overlay) =>
                    overlay.id === item.id
                      ? { ...overlay, style: { ...overlay.style, top: d.y, left: d.x } }
                      : overlay
                  )
                );
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                console.log("Resize stopped. New size/position:", parseInt(ref.style.width), parseInt(ref.style.height), position.x, position.y);
                setOverlays(prev =>
                  prev.map((overlay) =>
                    overlay.id === item.id
                      ? {
                          ...overlay,
                          style: {
                            width: parseInt(ref.style.width),
                            height: parseInt(ref.style.height),
                            top: position.y,
                            left: position.x
                          }
                        }
                      : overlay
                  )
                );
              }}
              style={{
                zIndex: 3,
                border: '1px dashed #999',
                cursor: 'grab',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  pointerEvents: 'none',
                }}
              />
            </Rnd>
          ))}
        </Paper>
      </Box>

      {overlays.length > 0 && (
        <Box textAlign="center" mt={2}>
          <Button variant="outlined" color="error" onClick={handleClearOverlays} sx={{ mr: 2 }}>
            Clear Products
          </Button>
          <Button variant="contained" color="success" onClick={runAutoFit} sx={{ mr: 2 }}>
            AI Best Fit (Mock)
          </Button>
          {/* NEW: Buy Now Button */}
          <Button variant="contained" color="primary" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </Box>
      )}

      <Typography variant="h5" mt={5} mb={2} textAlign="center">
        Choose More Products to Try
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {dummyProducts.map((prod, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': { boxShadow: 6 },
              }}
              onClick={() => handleOverlay(prod)}
            >
              <img
                src={prod.image}
                alt={prod.name}
                style={{ width: '100%', height: '150px', objectFit: 'contain' }}
              />
              <Typography mt={1}>{prod.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TryOn;