const Order = require('../models/Order');

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'cannot create order', success: false });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).json({ message: 'something went wrong cannot delete', success: false });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCart = await Order.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(400).json({ message: 'something went wromg', success: false });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id);
    res.status(200).send({ message: 'Order updated successfully', status: false });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong cannot delete', success: false });
  }
};
const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ userId: id });
    res.status(200).json({ data: orders, staus: true });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong cannot delete', success: false });
  }
};

const getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: '$createdAt' } }, sales: '$amount' },
      { $group: { _id: 'month', total: { $sum: '$sales' } } },
    ]);
    res.status(200).send(income);
  } catch (error) {}
};

module.exports = { createOrder, getAllOrders, getOrder, deleteOrder, updateOrder, getMonthlyIncome };
