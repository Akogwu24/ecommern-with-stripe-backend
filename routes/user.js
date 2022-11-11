const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyIsAdmin = require('../middleware/verifyIsAdmin');

router.get('/stats', userController.getUserStat);
router.route('/').get(verifyIsAdmin, userController.getAllUsers).post(userController.createNewUser);
router.route('/:id').patch(userController.updateUser).delete(userController.deleteUser).get(userController.getUser);

module.exports = router;
