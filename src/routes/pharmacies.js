import express from 'express';
import {getAllPharmacies, getPharmacy} from '../controllers/pharmacies.js';

const router = express.Router();

router.get('/', getAllPharmacies);
router.get('/:id', getPharmacy);

export default router;

