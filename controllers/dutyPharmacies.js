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

  try {
    const encodedPharmacyName = encodeURIComponent(pharmacyName);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    let closestPharmacy = null;
    console.log(data);
    if (data.results.length > 0) {
      // Sonuçları filtrele
      const normalizedPharmacyName = pharmacyName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      console.log(normalizedPharmacyName);
      console.log(data);
      closestPharmacy = data.results.find((pharmacy) =>
        pharmacy.name
          .toLowerCase()
          .includes(normalizedPharmacyName.split('')[0].toLowerCase())
      );
    }

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
