
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Rnd } from 'react-rnd';
import { useNavigate } from 'react-router-dom';

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
  const [loading] = useState(false);
  const avatarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProduct = localStorage.getItem('virtualProduct');

    if (!storedProduct) return;

    try {
      const product = JSON.parse(storedProduct);

      if (!product.style) {
        product.style = {
          top: 100,
          left: 100,
          width: 120,
          height: 150,
        };
      }

      if (!product.id) {
        product.id = generateUniqueId();
      }

      setOverlays([product]);
      localStorage.removeItem('virtualProduct');
    } catch (error) {
      console.error('Failed to parse virtual product:', error);
      localStorage.removeItem('virtualProduct');
    }
  }, []);

  useEffect(() => {
    return () => {
      if (avatarImage) {
        URL.revokeObjectURL(avatarImage);
      }
    };
  }, [avatarImage]);

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image.');
      return;
    }

    const imageURL = URL.createObjectURL(file);
    setAvatarImage(imageURL);
  };

  const runAutoFit = () => {
    const fitPoints = {
      wrist: { x: 280, y: 350 },
      torso: { x: 200, y: 200 },
      hip: { x: 200, y: 400 },
      face: { x: 200, y: 100 },
    };

    if (!avatarImage || overlays.length === 0) {
      alert('Please upload an avatar and select a product.');
      return;
    }

    setOverlays((previous) =>
      previous.map((item) => {
        let point;
        let width;
        let height;
        let offsetX;
        let offsetY;

        switch (item.type) {
          case 'watch':
            point = fitPoints.wrist;
            width = 70;
            height = 70;
            offsetX = width / 2;
            offsetY = height / 2;
            break;
          case 'dress':
            point = fitPoints.torso;
            width = 200;
            height = 300;
            offsetX = width / 2;
            offsetY = 30;
            break;
          case 'pants':
            point = fitPoints.hip;
            width = 180;
            height = 250;
            offsetX = width / 2;
            offsetY = 50;
            break;
          case 'shirt':
            point = fitPoints.torso;
            width = 180;
            height = 200;
            offsetX = width / 2;
            offsetY = 20;
            break;
          case 'glasses':
            point = fitPoints.face;
            width = 120;
            height = 50;
            offsetX = width / 2;
            offsetY = height / 2;
            break;
          case 'sherwani':
            point = fitPoints.torso;
            width = 220;
            height = 400;
            offsetX = width / 2;
            offsetY = 50;
            break;
          default:
            point = fitPoints.torso;
            width = 100;
            height = 150;
            offsetX = width / 2;
            offsetY = height / 2;
        }

        return {
          ...item,
          style: {
            left: Math.max(0, Math.min(point.x - offsetX, 400 - width)),
            top: Math.max(0, Math.min(point.y - offsetY, 600 - height)),
            width,
            height,
          },
        };
      })
    );
  };

  const handleOverlay = (product) => {
    setOverlays((previous) => [
      ...previous,
      {
        ...product,
        id: generateUniqueId(),
        style: {
          top: 100,
          left: 100,
          width: 120,
          height: 150,
        },
      },
    ]);
  };

  const handleClearOverlays = () => {
    setOverlays([]);
  };

  const handleCreateAvatar = () => {
    window.open(
      'https://mobile.metaperson.avatarsdk.com/generator',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleBuyNow = () => {
    if (overlays.length === 0) {
      alert('Please select a product to buy!');
      return;
    }

    localStorage.setItem(
      'productToConfirm',
      JSON.stringify(overlays[0])
    );

    navigate('/confirmorder');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f4f6f8', p: 4 }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        mb={2}
      >
        Virtual Try-On (Mock Test)
      </Typography>

      <Box textAlign="center" mb={3}>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
        />
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
                inset: 0,
                zIndex: 20,
                background: 'rgba(255,255,255,0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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

          <Box sx={{ textAlign: 'center', my: 2, position: 'relative', zIndex: 5 }}>
            <Button
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: '#673ab7',
                color: '#fff',
                '&:hover': { backgroundColor: '#5e35b1' },
                padding: '10px 20px',
                fontSize: '1rem',
                borderRadius: '8px',
                textTransform: 'none',
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
              size={{
                width: item.style.width,
                height: item.style.height,
              }}
              bounds="parent"
              enableResizing
              onDragStop={(event, data) => {
                setOverlays((previous) =>
                  previous.map((overlay) =>
                    overlay.id === item.id
                      ? {
                          ...overlay,
                          style: {
                            ...overlay.style,
                            top: data.y,
                            left: data.x,
                          },
                        }
                      : overlay
                  )
                );
              }}
              onResizeStop={(event, direction, ref, delta, position) => {
                setOverlays((previous) =>
                  previous.map((overlay) =>
                    overlay.id === item.id
                      ? {
                          ...overlay,
                          style: {
                            width: parseInt(ref.style.width, 10),
                            height: parseInt(ref.style.height, 10),
                            top: position.y,
                            left: position.x,
                          },
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
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearOverlays}
            sx={{ mr: 2 }}
          >
            Clear Products
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={runAutoFit}
            sx={{ mr: 2 }}
          >
            AI Best Fit (Mock)
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </Box>
      )}

      <Typography variant="h5" mt={5} mb={2} textAlign="center">
        Choose More Products to Try
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {dummyProducts.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product.name}>
            <Paper
              sx={{
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': { boxShadow: 6 },
              }}
              onClick={() => handleOverlay(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'contain',
                }}
              />
              <Typography mt={1}>{product.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TryOn;
