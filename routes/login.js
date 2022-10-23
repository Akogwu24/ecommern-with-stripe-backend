const router = require('express').Router();
const loginController = require('../controllers/loginController');

router.post('/login', loginController);

module.exports = router;
