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

// Enhanced product search endpoint (v2.0.0)
app.get('/products/search', (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: "Query parameter 'keyword' is required." });
  }

  if (keyword.length < 3) {
    return res.status(422).json({ error: "Keyword must be at least 3 characters long." });
  }

  const results = products.filter(product =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  if (results.length === 0) {
    return res.status(404).json({ error: "No products found matching your keyword." });
  }

  res.status(200).json(results);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Product Service v2.0.0 is running on port ${PORT}`);
});
