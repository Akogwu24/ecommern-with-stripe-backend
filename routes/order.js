const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('test endpoint');
  res.status(200).send({ message: 'request successful', success: true });
});

router.post('/', (req, res) => {
  const username = req.body.username;
  res.status(200).send({ message: `user ${username} created`, success: true });
});

router.patch('/', (req, res) => {});

module.exports = router;
