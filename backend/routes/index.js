const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Route 1');
});

module.exports = router;