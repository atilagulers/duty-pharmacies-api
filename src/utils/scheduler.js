import schedule from 'node-schedule';
import Pharmacy from '../models/Pharmacy.js';
import axios from 'axios';

// update pharmacies
export const updatePharmacies = async () => {
  try {
    console.log('Scheduled job started:', new Date());
    const {data} = await axios.get(`${process.env.PHARMACY_API}/getAll`, {
      headers: {
        Authorization: `Bearer ${process.env.PHARMACY_API_TOKEN}`,
      },
    });

    const {data: pharmacies, rowCount} = data;

    const newPharmacies = pharmacies.map((pharmacy) => ({
      pharmacyName: pharmacy.EczaneAdi,
      address: pharmacy.Adresi,
      district: pharmacy.Semt,
      directions: pharmacy.YolTarifi,
      phone: pharmacy.Telefon,
      phone2: pharmacy.Telefon2,
      city: pharmacy.Sehir,
      county: pharmacy.ilce.replace('i̇', 'i'),
      latitude: pharmacy.latitude,
      longitude: pharmacy.longitude,
    }));

    await Pharmacy.deleteMany({});
    await Pharmacy.insertMany(newPharmacies);

    console.log('Scheduled job completed:', new Date());
    return 'Pharmacies updated';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//...
