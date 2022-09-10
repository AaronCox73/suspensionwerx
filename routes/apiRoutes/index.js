const express = require('express');
const router = express.Router();


router.use(require('./customerRoutes'));
router.use(require('./machineRoutes'));

module.exports = router;
