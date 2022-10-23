const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ message: 'Username and password are required', success: false, data: {} });

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) return res.status(404).send({ message: 'user not found', success: false });

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    //create jwt

    // const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        userInfo: {
          username: foundUser.username,
          userId: foundUser._id,
          email: foundUser.email,
          isAdmin: foundUser.isAdmin,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5d',
      }
    );

    const { password, ...user } = foundUser._doc;
    res.json({ ...user, accessToken });
  } else {
    res.status(401);
  }
};

module.exports = handleLogin;
