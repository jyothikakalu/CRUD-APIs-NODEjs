const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Create a product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all products with filters and pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 10, productName, category } = req.query;
    const query = {};
    
    if (productName) {
      query.productName = productName;
    }
    if (category) {
      query.productCategory = category;
    }

    const products = await Product.find(query)
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize));

    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
