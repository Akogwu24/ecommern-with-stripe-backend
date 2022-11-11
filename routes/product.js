const express = require('express');
const productsController = require('../controllers/productController');
const verifyIsAdmin = require('../middleware/verifyIsAdmin');
const router = express.Router();

router.route('/').get(productsController.getAllProducts).post(verifyIsAdmin, productsController.createProduct);
router
  .route('/:id')
  .patch(verifyIsAdmin, productsController.updateProduct)
  .delete(verifyIsAdmin, productsController.deleteProduct)
  .get(productsController.getProduct);

module.exports = router;
