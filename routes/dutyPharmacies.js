const express = require('express');
const router = express.Router();

const {
  getAllDutyPharmacies,
  getNearestPharmacy,
} = require('../controllers/dutyPharmacies');

router.route('/').get(getAllDutyPharmacies);
router.route('/nearest-pharmacy').get(getNearestPharmacy);

module.exports = router;
