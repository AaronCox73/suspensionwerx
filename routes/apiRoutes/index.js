const express = require('express');
const router = express.Router();
const homeRoutes = require('./home-routes.js');


router.use(require('./customerRoutes'));
router.use(require('./machineRoutes'));
router.use('/', homeRoutes);
module.exports = router;
