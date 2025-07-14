import React from 'react';
import { Box, Typography, Grid, Paper, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CategoryIcon from '@mui/icons-material/Category';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import VirtualizationModal from '../components/VirtualizationModal';
import { useVirtualization } from '../context/VirtualizationContext';

const categories = [
  { name: 'Mobile', image: '/assets/Mobile.jpg', path: '/mobile' },
  { name: 'Electronics', image: '/assets/Electronics.jpg', path: '/electronics' },
  { name: 'Fashion', image: '/assets/Fashion.jpg', path: '/fashion' },
  { name: 'Home1', image: '/assets/Home.jpg', path: '/home1' },
  { name: 'Beauty', image: '/assets/BeautyProducts.jpg', path: '/beauty' },
];

const featuredProducts = [
  { name: 'Smart Watch', image: '/assets/Smartwatch.jpg', price: '₹999', type: 'watch' },
  { name: 'Sports Car Toy', image: '/assets/SportsCar.jpg', price: '₹799' },
  { name: 'Smart TV', image: '/assets/SmartTV.jpg', price: '₹24,999' },
  { name: 'Gaming Mouse', image: '/assets/Mouse.jpg', price: '₹399' },
  { name: 'White Kurti', image: '/assets/Whitekurti.jpg', price: '₹599', type: 'dress' },
  { name: 'Men Casual', image: '/assets/Mencasual.jpg', price: '₹499', type: 'dress' },
  { name: 'Party Wear', image: '/assets/Function.jpg', price: '₹999', type: 'dress' },
  { name: 'Pretty Pink Lahanga', image: '/assets/Pinklahanga.jpg', price: '₹1099', type: 'dress' },
  { name: 'Kids shirt', image: '/assets/Brownshirt.jpg', price: '₹599', type: 'dress' },
  { name: 'T-Shirt', image: '/assets/T-Shirt.jpg', price: '₹99', type: 'dress' },
  { name: 'Black', image: '/assets/Black.jpg', price: '₹599', type: 'dress' },
  { name: 'Arat', image: '/assets/Arat.jpg', price: '₹599', type: 'dress' },
  { name: 'denim jeans', image: '/assets/denim jeans.jpg', price: '₹599', type: 'dress' },
  { name: 'sherwani', image: '/assets/sherwani.jpg', price: '₹599', type: 'dress' },
];

const Home = () => {
  const [virtualizeModalOpen, setVirtualizeModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { setVirtualProduct } = useVirtualization();
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    if (['dress', 'watch'].includes(product.type)) {
      setSelectedProduct(product);
      setVirtualizeModalOpen(true);
    }
  };

  const handleVirtualizeConfirm = () => {
    setVirtualizeModalOpen(false);
    setVirtualProduct(selectedProduct);
    localStorage.setItem('virtualProduct', JSON.stringify(selectedProduct));
    navigate('/tryon');
  };

  const handleCategoryPress = (path) => {
    navigate(path);
  };

  

  return (
    <div style={styles.container}>
      <VirtualizationModal
        open={virtualizeModalOpen}
        onClose={() => setVirtualizeModalOpen(false)}
        onConfirm={handleVirtualizeConfirm}
        product={selectedProduct}
      />

      {/* Search Bar */}
      <div style={styles.navbar}>
        <div style={styles.logo}>TRENZ</div>
        <input style={styles.search} placeholder="Search for products, brands and more" />
        <div style={styles.navActions}>
          <button style={styles.button}>Login</button>
          <button style={styles.button}>Become a Seller</button>
          <div style={styles.cart}>🛒</div>
        </div>
      </div>

      

      {/* Category Icons */}
      <div style={styles.categories}>
        {categories.map((cat, i) => (
          <div key={i} style={styles.categoryItem} onClick={() => handleCategoryPress(cat.path)}>
            <img src={cat.image} alt={cat.name} style={styles.categoryIcon} />
            <div style={styles.categoryLabel}>{cat.name}</div>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div style={styles.promoBanner}>
        <img src="/assets/Banner.jpg" alt="promo" style={styles.promoImage} />
      </div>

      {/* Featured Products */}
      <h2 style={{ margin: '20px 0 10px 20px' }}>Top Deals</h2>
      <div style={styles.products}>
        {featuredProducts.map((prod, i) => (
          <div key={i} style={styles.productCard} onClick={() => handleProductClick(prod)}>
            <img src={prod.image} alt={prod.name} style={styles.productImage} />
            <div style={styles.productName}>{prod.name}</div>
            <div style={styles.productPrice}>{prod.price}</div>
          </div>
        ))}
      </div>

      {/* Jotform Chatbot */}
      <script src="https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener("DOMContentLoaded", function() {
              window.AgentInitializer.init({
                rootId: "JotformAgent-0197d57ca8d57f26bdfb5b627b7293910fed",
                formID: "0197d57ca8d57f26bdfb5b627b7293910fed",
                domain: "https://www.jotform.com",
                isInitialOpen: false,
                isDraggable: false,
                background: "linear-gradient(180deg, #035C5F 0%, #035C5F 100%)",
                buttonBackgroundColor: "#8E1CA8",
                buttonIconColor: "#FFFFFF",
                customizations: {
                  greeting: "Yes",
                  greetingMessage: "Hi! How can I assist you?",
                  pulse: "Yes",
                  position: "right"
                }
              });
            });
          `,
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f1f3f6',
    minHeight: '100vh',
  },
  navbar: {
    backgroundColor: '#2874f0',
    display: 'flex',
    padding: '10px 20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '24px',
  },
  search: {
    flex: 1,
    margin: '0 20px',
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  button: {
    backgroundColor: '#fff',
    color: '#2874f0',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
  cart: {
    fontSize: '20px',
  },
  categories: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: '10px 0',
  },
  categoryItem: {
    textAlign: 'center',
    cursor: 'pointer',
  },
  categoryIcon: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
  },
  categoryLabel: {
    fontSize: '12px',
    marginTop: '4px',
  },
  promoBanner: {
    margin: '20px',
    overflow: 'hidden',
    borderRadius: '8px',
  },
  promoImage: {
    width: '100%',
    borderRadius: '8px',
  },
  products: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '0 20px',
  },
  productCard: {
    backgroundColor: '#fff',
    width: '180px',
    margin: '10px',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: '130px',
    objectFit: 'contain',
    marginBottom: '8px',
  },
  productName: {
    fontSize: '14px',
    fontWeight: '600',
  },
  productPrice: {
    color: '#388e3c',
    fontWeight: 'bold',
  },
};

export default Home;