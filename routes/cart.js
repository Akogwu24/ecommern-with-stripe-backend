const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyIsAdmin = require('../middleware/verifyIsAdmin');

router.route('/').get(verifyIsAdmin, cartController.getAllCarts).post(cartController.createCart);

router.route('/:id').patch(cartController.updateCart).delete(cartController.deleteCart).get(cartController.getUserCart);

module.exports = router;
