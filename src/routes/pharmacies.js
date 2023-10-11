import express from 'express';
import {getAllPharmacies, getPharmacy} from '../controllers/pharmacies.js';
import {updatePharmacies} from '../utils/scheduler.js';

const router = express.Router();

router.get('/', getAllPharmacies);

router.get('/update', async (req, res) => {
  try {
    const pharmacies = await updatePharmacies();
    return res.status(200).json({msg: 'pharmacies updated'});
  } catch (error) {
    console.error(error);
    return res.status(500).send('An error occurred while updating pharmacies');
  }
});
router.get('/:id', getPharmacy);

export default router;
