const stripe = require('stripe')(process.env.STRIPE_KEY);

const stripePayment = async (req, res) => {
  stripe.charges.create({ source: req.body.tokenId, amount: req.body.amount, currency: 'NGN' }, (stripeError, stripeResponse) => {
    if (stripeError) {
      res.status(404).json({ message: 'Bad request', success: false });
    } else {
      res.status(200).json(stripeResponse);
    }
  });
};

module.exports = stripePayment;
