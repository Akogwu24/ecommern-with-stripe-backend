const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find({});
    }

    if (!products.length) return res.status(404).json({ message: 'no product in this category', data: [] });
    res.status(200).send({ message: 'product fetched successfully', data: products });
  } catch (error) {
    res.status(400).json('bad request');
  }
};

const createProduct = async (req, res) => {
  const { title, desc, categories = [], img, size, color, price } = req.body;

  if (!title) return res.status(400).json({ message: 'Product must have a name/title', success: false });
  if (!desc) return res.status(400).json({ message: 'Add decription for the product', success: false });
  if (!categories.length) return res.status(400).json({ message: 'Add product category', success: false });
  if (!size) return res.status(400).json({ message: 'Add product size', success: false });
  if (!price) return res.status(400).json({ message: 'Add product prize', success: false });
  if (!color) return res.status(400).json({ message: 'Add product color', success: false });
  if (!img) return res.status(400).json({ message: 'Add product image', success: false });

  try {
    const duplicate = await Product.findOne({ title });

    if (duplicate) return res.status(409).json({ message: 'Product(title) already exist', success: false });
    const newProduct = await Product.create(req.body);

    res.status(201).send({ message: 'Product created successfully', data: newProduct, success: true });
  } catch (error) {
    res.status(400).send({ message: error.message, msg: 'bad request' });
  }
};

const updateProduct = async (req, res) => {
  if (!req.params.id) return res.status(400).json({ message: 'Input the product Id', success: false });
  const { id } = req.params;

  const { title, desc, categories = [], img, size, color, price } = req.body;

  try {
    const product = await Product.findOne({ _id: id }).exec();

    if (title) product.title = title;
    if (desc) product.desc = desc;
    if (categories) product.categories = categories;
    if (img) product.img = img;
    if (size) product.size = size;
    if (color) product.color = color;
    if (price) product.price = price;

    const updatedProduct = await product.save();
    res.status(200).send({ message: 'Successfully updated', success: true, data: updatedProduct });
  } catch (e) {
    res.status(400).send({ message: `product not found`, success: false });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id }).exec();
    if (!product) return res.status(404).json({ message: 'Product not found', success: false });
    const deletedProduct = await product.deleteOne({ _id: id });
    res.status(200).send({ message: 'Product deleted succesfully', success: true, data: deletedProduct });
  } catch (e) {
    res.status(400).send({ message: 'cannot find product', success: false });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id }).exec();

    if (!product) return res.status(400).send({ message: 'Product not found', success: false, data: {} });
    res.status(200).json({ message: 'product fetched successfully', data: product });
  } catch (error) {
    res.status(400).send({ message: 'Product not found', success: false, data: {} });
  }
};

module.exports = { getAllProducts, createProduct, deleteProduct, updateProduct, getProduct };
