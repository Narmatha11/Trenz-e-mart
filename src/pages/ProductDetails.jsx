import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Helper function to determine if a product type is considered a "fashion" item for virtual try-on
const isFashionProduct = (productType) => {
  // Add all types that should go to the Try-On page
  const fashionCategories = ['dress', 'watch', 'pants', 'shirt', 'glasses', 'sherwani'];
  return fashionCategories.includes(productType);
};

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  // If product data is not found (e.g., direct access without product state)
  if (!product) {
    return (
      <div style={styles.centered}>
        <p>Product details not found. Please select a product from the home page.</p>
        <button onClick={() => navigate('/')} style={styles.backButton}>Go to Home</button>
      </div>
    );
  }

  // --- Handlers for button clicks ---

  // For "Apply Virtual Try-On" button
  const handleTryOnClick = () => {
    // Ensure the product has a 'type' for the TryOn page's logic
    // The type should ideally be passed from the HomePage when the product is selected.
    // If 'product.type' is not set, you might fall back to a default or show an error.
    // Here, we ensure it has a type, falling back to 'unknown' if not present.
    const productForTryOn = { ...product, type: product.type || 'unknown' };

    // Save the product to localStorage for the TryOn page to pick up
    localStorage.setItem('virtualProduct', JSON.stringify(productForTryOn));
    navigate('/tryon'); // Navigate to the TryOn page
  };

  // For "Buy Now" button
  const handleBuyNowClick = () => {
    // Save the product to localStorage for the ConfirmOrder page to pick up
    localStorage.setItem('productToConfirm', JSON.stringify(product));
    navigate('/confirmorder'); // Navigate to the Confirm Order page
  };

  // --- Conditional Button Rendering ---
  const showTryOnButton = isFashionProduct(product.type);
  const showBuyNowButton = !isFashionProduct(product.type); // Show Buy Now if it's not a fashion product

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.details}>
          <h2 style={styles.name}>{product.name}</h2>
          <p style={styles.price}>{product.price}</p>
          <p style={styles.description}>
            {/* Dynamic description based on product type */}
            {showTryOnButton
              ? "Explore the features of this fashion product. Want to see how it looks on you? Try it virtually!"
              : "Explore the features of this product. Ready to make it yours?"
            }
          </p>

          {/* Conditional rendering of buttons */}
          {showTryOnButton && (
            <button style={styles.tryOnButton} onClick={handleTryOnClick}>
              Apply Virtual Try-On
            </button>
          )}

          {showBuyNowButton && (
            <button style={styles.buyNowButton} onClick={handleBuyNowClick}>
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f1f3f6',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    gap: '40px',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    maxWidth: '900px',
    margin: 'auto',
    alignItems: 'center',
    flexWrap: 'wrap', // Allows wrapping on smaller screens
    justifyContent: 'center', // Centers items when wrapped
  },
  image: {
    width: '300px',
    height: '300px',
    objectFit: 'contain',
    borderRadius: '12px',
    border: '1px solid #ddd',
  },
  details: {
    flex: 1,
    minWidth: '250px', // Ensures text block doesn't get too small
    maxWidth: 'calc(100% - 340px)', // Adjust based on image width + gap
    // On smaller screens, allow full width
    '@media (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
  name: {
    fontSize: '28px',
    marginBottom: '10px',
  },
  price: {
    fontSize: '22px',
    color: '#2e7d32',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  description: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  tryOnButton: {
    backgroundColor: '#2874f0',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%', // Make button full width of its container
    maxWidth: '300px', // Optional: cap max width for aesthetic
    marginTop: '10px',
  },
  buyNowButton: { // New style for Buy Now button
    backgroundColor: '#FF9900', // Amazon-like orange
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '300px',
    marginTop: '10px',
  },
  centered: {
    textAlign: 'center',
    padding: '40px',
  },
  backButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#2874f0',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default ProductDetails;