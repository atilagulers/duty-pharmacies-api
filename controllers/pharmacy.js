const calculateDistance = require('../helpers/calculateDistance');

const getAllPharmacies = async (req, res) => {
  const {city, county, lat, lng} = req.query;

  const userLocation = {lat, lng};

  const apiUrl = `${process.env.API_URL}?city=${city}&county=${county || ''}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.API_AUTH_KEY}`,
      },
    });
    const data = await response.json();
    const pharmacies = data.data;
    const sortedPharmacies = [...pharmacies].sort((a, b) => {
      const distanceA = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        a.latitude,
        a.longitude
      );
      const distanceB = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        b.latitude,
        b.longitude
      );
      // Sort based on distance
      return distanceA - distanceB;
    });

    if (lat && lng)
      res.json({
        data: sortedPharmacies,
      });
    else res.json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getNearestPharmacy = async (req, res) => {
  const {lat, lng, radius, pharmacyName} = req.query;
  const apiKey = process.env.API_GOOGLE_PLACES;
  try {
    const encodedPharmacyName = encodeURIComponent(pharmacyName);
    console.log(encodedPharmacyName);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedPharmacyName}&location=${lat},${lng}&radius=${radius}&type=pharmacy&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    let closestPharmacy = null;

    if (data.results.length > 0) {
      closestPharmacy = data.results[0];
    }
    res.json(closestPharmacy);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: `An error occurred during the API request. ${error}`});
  }
};

module.exports = {
  getAllPharmacies,
  getNearestPharmacy,
};
