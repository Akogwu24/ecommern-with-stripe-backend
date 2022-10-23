const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) return res.status(204).send({ message: 'no users found', data: [] });

    const usersWothoutPassword = await users.map((user) => {
      const { password, ...otherInfo } = user._doc;
      return { ...otherInfo };
    });
    res.status(200).send({ message: 'users fetched succeffully', data: usersWothoutPassword });
  } catch (error) {
    res.status(400).json('bad request');
  }
};

const createNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) return res.status(400).json({ message: 'username is required' });
  if (!email) return res.status(400).json({ message: 'email is required' });
  if (!password) return res.status(400).json({ message: 'password is required' });

  try {
    const duplicate = await User.findOne({ email }).exec();

    if (duplicate) return res.status(400).json({ message: 'email already exist', success: false });
    const newUser = await User.create({ username, email, password });
    res.status(201).send({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(400).json(req.body);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).exec();

  try {
    if (!user) return res.status(404).send({ message: 'user not found', data: {} });

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;

    const updatedUser = await user.save();
    const { password, ...otherDetails } = updatedUser._doc;
    res.status(201).json({ message: 'user updated', user: otherDetails });
  } catch (error) {
    res.status(404).json({ message: 'user not found' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id }).exec();
    if (!user) return res.status(404).send({ message: 'user not found', data: {} });

    const deletedUser = await User.deleteOne({ _id: id });

    res.status(200).send({ message: 'user deleted successfully', success: true, data: deletedUser });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id }).exec();
    if (!user) return res.staus(404).send({ message: 'user not found', data: {} });
    const { password, ...userDetails } = user._doc;
    res.status(200).send({ message: 'successfully fetched', data: userDetails });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
};

const getUserStat = async (req, res) => {
  console.log('ddd', req.url);
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    res.send('user stat');
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: '$createdAt' } } },
      { $group: { _id: '$month', total: { $sum: 1 } } },
    ]);

    console.log('data', data);

    // res.status(200).send(...data);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = { getUserStat, getAllUsers, createNewUser, updateUser, deleteUser, getUser };
