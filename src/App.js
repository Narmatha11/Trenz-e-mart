import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Recommendations from './pages/Recommendations';
import Mobile from './pages/Mobile';
import Electronics from './pages/Electronics';
import Fashion from './pages/Fashion';
import Home1 from './pages/Home1';
import Beauty from './pages/Beauty';
import ProductDetails from './pages/ProductDetails';
import AvatarBuilder from './pages/AvatarBuilder'; // 👈 Import
import TryOn from './pages/TryOn'; // 👈 Import
import analyzeImage from './utils/analyzeImage';
import ConfirmOrder from './pages/ConfirmOrder';
import OrderSuccess from './pages/OrderSuccess';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  const handleImageAnalyze = async (image) => {
    const results = await analyzeImage(image);
    setRecommendations(results);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/upload">Upload</Button>
          <Button color="inherit" component={Link} to="/recommendations">Recommendations</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload onImageAnalyze={handleImageAnalyze} />} />
          <Route path="/recommendations" element={<Recommendations recommendations={recommendations} />} />
<Route path="/mobile" element={<Mobile />} />
<Route path="/electronics" element={<Electronics />} />
<Route path="/fashion" element={<Fashion />} />
<Route path="/home1" element={<Home1 />} />
<Route path="/beauty" element={<Beauty />} />
<Route path="/product-details" element={<ProductDetails />} />
<Route path="/avatar-builder" element={<AvatarBuilder />} />
<Route path="/tryon" element={<TryOn />} />
<Route path="/confirmorder" element={<ConfirmOrder />} />
<Route path="/OrderSuccess" element={<OrderSuccess />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;