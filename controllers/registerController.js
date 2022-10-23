const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerNewUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) return res.status(400).send({ message: 'username, email and password are required', data: {} });

  const duplicate = await User.findOne({ email }).exec();
  //   if (duplicate) return res.sendStatus(409);

  if (duplicate) return res.status(409).send({ message: 'user already exists', data: {} });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ success: `new user ${username} created!` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = registerNewUser;
