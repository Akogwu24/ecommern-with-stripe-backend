const Cart = require('../models/Cart');

const getAllCarts = async (req, res) => {
  console.log('test endpoint');
  res.status(200).send({ message: 'request successful', success: true });
};

const createCart = async (req, res) => {
  console.log('test endpoint');
  res.status(200).send({ message: 'request successful', success: true });
};

module.exports = { getAllCarts };
