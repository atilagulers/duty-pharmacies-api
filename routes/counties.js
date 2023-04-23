const express = require('express');
const router = express.Router();

const {getAllCounties} = require('../controllers/counties');

router.route('/').get(getAllCounties);

module.exports = router;
