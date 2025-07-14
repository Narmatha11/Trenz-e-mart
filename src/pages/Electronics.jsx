import React from 'react';
import { useNavigate } from 'react-router-dom';

const ElectronicsProducts = [
  {
    name: 'Refrigerator',
    price: '₹29,999',
    image: 'data:image/jpeg;base64,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',
  },
  {
    name: 'Washing Machine',
    price: '₹4,999',
    image: 'data:image/jpeg;base64,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',
  },
  {
    name: 'Gaming Mouse',
    price: '₹999',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2CPkxCBikLjRBvoSQnnUV-o5ZdU29DGKBA&s',
  },
  {
    name: 'Camera',
    price: '₹9,999',
    image: 'https://images-cdn.ubuy.co.in/65fe64a89de64a706c0120dc-canon-eos-5d-mark-iv-dslr-camera-with.jpg',
  },
  {
    name: 'LED TV',
    price: '₹13,999',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/ua43t5410akxxl/gallery/in-fhd-t5310-ua43t5410akxxl-532972655?$684_547_PNG$',
  },
  {
    name: 'Headphone',
    price: '₹25,999',
    image: 'https://www.boat-lifestyle.com/cdn/shop/products/main2_b66dce6b-710d-49cb-9d1c-2bc8c9c0ab15.png?v=1645698328',
  },
];

const Electronics = () => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    // Example: Navigate to product details or virtual try-on
    console.log('Clicked:', product.name);
    navigate('/product-details', { state: { product } }); // optional route for expansion
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Electronics</h2>
      <div style={styles.grid}>
        {ElectronicsProducts.map((product, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              style={styles.image}
            />
            <div style={styles.name}>{product.name}</div>
            <div style={styles.price}>{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    width: '200px',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'contain',
    marginBottom: '10px',
  },
  name: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: '5px',
  },
};

export default Electronics;