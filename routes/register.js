const router = require('express').Router();
const registerController = require('../controllers/registerController');

router.post('/register', registerController);

module.exports = router;
