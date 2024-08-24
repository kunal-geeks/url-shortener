const express = require('express');
const urlRoutesV1 = require('./v1/urlRoutes');

const router = express.Router();

router.use('/v1/urls', urlRoutesV1);

module.exports = router;
