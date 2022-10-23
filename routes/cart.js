const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.route('/').get(cartController.getAllCarts).post();

router.post('/', (req, res) => {
  const username = req.body.username;
  res.status(200).send({ message: `user ${username} created`, success: true });
});

router.patch('/', (req, res) => {});

module.exports = router;
