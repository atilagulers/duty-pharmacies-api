const express = require('express');
const router = express.Router();

const {
  getAllPharmacies,
  getNearestPharmacy,
} = require('../controllers/pharmacy');

router.route('/').get(getAllPharmacies);
router.route('/nearest-pharmacy').get(getNearestPharmacy);

module.exports = router;
