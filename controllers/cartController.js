const Cart = require('../models/Cart');

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});
    if (!carts.length) return res.status(404).send({ message: 'no cart found', success: false, data: [] });
    res.status(200).send({ message: 'carts fetched successfully', success: false, data: carts });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong', success: false, data: error.message });
  }
};

const createCart = async (req, res) => {
  const { userId, products } = req.body;
  if (!userId) return res.status(400).json({ message: 'cannot create', status: false });
  //   if (!products.includes()) return res.status(400).json({ message: 'cannot create', status: false });
  try {
    const cart = await Cart.create(req.body);

    res.status(201).send({ message: 'cart created successfully', success: true, data: cart });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong', success: false, data: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).send({ message: 'cart updated successfully', success: true, data: updatedCart });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong', success: false, data: error.message });
  }
};
const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findById(id);
    if (!cart) return res.status(404).json({ message: 'Cart not found', success: false });
    const deletedCart = await cart.deleteOne({ _id: id });
    res.status(200).json({ message: 'deleted successfully', success: true, data: deletedCart });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong', success: false, data: error.message });
  }
};

const getUserCart = async (req, res) => {
  const { id } = req.body;
  try {
    const userCart = await Cart.findOne({ userId: id });
    if (!userCart) return res.status(404).send({ message: 'cart not found', success: false });
    res.status(200).send(userCart);
    res;
  } catch (e) {
    res.status(400).json({ message: 'something went wrong', success: false, data: error.message });
  }
};

module.exports = { getAllCarts, createCart, updateCart, deleteCart, getUserCart };
