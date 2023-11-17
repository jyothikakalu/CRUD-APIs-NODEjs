const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  productCategory: { type: String, required: true },
  imageUrl: { type: String, required: true },
  productDescription: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
