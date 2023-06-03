const getAllDutyPharmacies = async (req, res) => {
  const {city, county} = req.query;

  const apiUrl = `${process.env.API_URL}?city=${city}&county=${county || ''}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.API_AUTH_KEY}`,
      },
    });
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getNearestPharmacy = async (req, res) => {
  const {lat, lng, radius, pharmacyName} = req.query;
  const apiKey = process.env.API_GOOGLE_PLACES;

  if (!pharmacyName) pharmacyName = '';
  if (!radius) radius = 1000;

  try {
    const encodedPharmacyName = encodeURIComponent(pharmacyName);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=pharmacy&name=${encodedPharmacyName}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const closestPharmacy = data.results[0];

    res.json(closestPharmacy);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: `API isteği sırasında bir hata oluştu. ${error}`});
  }
};

module.exports = {
  getAllDutyPharmacies,
  getNearestPharmacy,
};
