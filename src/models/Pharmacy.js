import mongoose from 'mongoose';

const PharmacySchema = new mongoose.Schema(
  {
    pharmacyName: String,
    address: String,
    district: String,
    directions: String,
    phone: String,
    phone2: String,
    city: String,
    county: String,
    latitude: Number,
    longitude: Number,
  },
  {timestamps: true}
);

const Pharmacy = mongoose.model('Pharmacy', PharmacySchema);

export default Pharmacy;
