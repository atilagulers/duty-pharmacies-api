import httpStatus from 'http-status';
import Pharmacy from '../models/Pharmacy.js';
import {createRequire} from 'module';
import {count} from 'console';
const require = createRequire(import.meta.url);
const data = require('../data/data.json');

export const getAllPharmacies = async (req, res, next) => {
  try {
    let {city, county} = req.query;
    city = city || '';
    county = county || '';
    let cityData = {};
    if (city) {
      cityData = data.find((d) => d.citySlug === city);
      city = cityData.cityName;
    }
    if (county) {
      county = cityData.counties.find(
        (c) => c.countySlug === county.replace('i̇', 'i')
      ).countyName;
      console.log(county);
    }

    const pharmacies = await Pharmacy.find({
      city: {$regex: city, $options: 'i'},
      county: {$regex: county, $options: 'i'},
    });

    res.status(httpStatus.OK).json(pharmacies);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const getPharmacy = async (req, res, next) => {
  const {id: pharmacyId} = req.params;

  const pharmacy = await Pharmacy.findById(pharmacyId);

  const encodedName = encodeURIComponent(pharmacy.pharmacyName);
  res.status(httpStatus.OK).json({data: pharmacy, isFound: false});
  //const encodedAddress = encodeURIComponent(closestPharmacy.address);

  //const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pharmacy.latitude},${pharmacy.longitude}&radius=1000&keyword=${encodedName}&type=pharmacy&key=${process.env.GOOGLE_PLACES_KEY}`;

  // other url test to accuracy DON'T DELETE for now
  // const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedName}&location=${pharmacy.latitude},${pharmacy.longitude}&radius=2000&type=pharmacy&key=${process.env.GOOGLE_PLACES_API}`;

  //const places = await axios.get(url);

  //const closestPlace = places.data.results[0];

  // if place is found on google places send the pharmacy from google's data
  //if (closestPlace) {
  //  res.status(httpStatus.OK).json({data: closestPlace, isFound: true});
  //}
  //// if not send pharmacy from our DB
  //else {
  //  res.status(httpStatus.OK).json({data: pharmacy, isFound: false});
  //}
};
