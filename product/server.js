const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample product data
const products = [
  { id: 1, name: 'iPhone 15', price: 999 },
  { id: 2, name: 'Samsung Galaxy S24', price: 899 },
  { id: 3, name: 'OnePlus 12', price: 799 }
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Products list endpoint
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// Product search endpoint (v1.1.0)
app.get('/products/search', (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: "Missing 'keyword' query parameter." });
  }

  const results = products.filter(product =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  res.status(200).json(results);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Product Service v1.1.0 is running on port ${PORT}`);
});

