const express = require('express');
const router = express.Router();

const {getAllDutyPharmacies} = require('../controllers/dutyPharmacies');

router.route('/').get(getAllDutyPharmacies);

module.exports = router;
