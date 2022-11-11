const router = require('express').Router();

const stripePayment = require('../controllers/stripePaymentController');

router.post('/', stripePayment);

module.exports = router;
