const getAllCities = async (req, res) => {
  try {
    const response = await fetch(`${process.env.API_URL}/city`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.API_AUTH_KEY}`,
      },
    });
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getAllCities,
};
