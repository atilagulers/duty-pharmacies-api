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

module.exports = {
  getAllDutyPharmacies,
};
