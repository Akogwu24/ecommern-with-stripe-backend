const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyIsAdmin = require('../middleware/verifyIsAdmin');

router.route('/').get(verifyIsAdmin, orderController.getAllOrders).post(orderController.createOrder);

router.route('/:id').delete(orderController.deleteOrder).get(orderController.getOrder).patch(verifyIsAdmin, orderController.updateOrder);

router.get('/income', orderController.getMonthlyIncome);

module.exports = router;
