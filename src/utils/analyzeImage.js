// src/utils/analyzeImage.js

export const analyzeImage = async (imageFile) => {
  if (!imageFile || !imageFile.name) {
    return [
      { name: "Basic Blue T-Shirt", price: 499, image: "/assets/basic-blue.jpg" },
    ];
  }

  const filename = imageFile.name.toLowerCase();

  if (filename.includes("beach")) {
    return [
      { name: "Beach Shorts", price: 699, image: "/assets/beachwear.jpg" },
      { name: "Flip-Flops", price: 299, image: "/assets/flipflops.jpg" },
    ];
  } else if (filename.includes("formal")) {
    return [
      { name: "Formal Blazer", price: 1999, image: "/assets/blazer.jpg" },
      { name: "White Shirt", price: 899, image: "/assets/white-shirt.jpg" },
      { name: "coat", price: 799, image: "/assets/coat.jpg" },
      { name: "Brown", price: 899, image: "/assets/Brown.jpg" },
      { name: "denim jeans", price: 499, image: "/assets/denim jeans.jpg" },
      { name: "Menswear", price: 3899, image: "/assets/Menswear.jpg" },
      { name: "Blue", price: 2899, image: "/assets/Blue.jpg" },
      { name: "BrownShirt", price: 1899, image: "/assets/BrownShirt.jpg" },
    ];
  } else if (filename.includes("party")) {
    return [
      { name: "Red Party Dress", price: 1499, image: "/assets/party-dress.jpg" },
      { name: "Silver Heels", price: 1099, image: "/assets/silver-heels.jpg" },
    ];
  }

  // Default fallback
  return [
    { name: "Blue Summer Dress", price: 999, image: "/assets/blue-dress.jpg" },
    { name: "Beachwear White Set", price: 1299, image: "/assets/beachwear.jpg" },
    { name: "Whitekurti", price: 1299, image: "/assets/Whitekurti.jpg" },
    { name: "Blue", price: 1299, image: "/assets/Blue.jpg" },

  ];
};
export default analyzeImage;