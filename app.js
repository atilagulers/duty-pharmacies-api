require('dotenv').config();

// express
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');

app.use(express.json());

app.get('/api/nobetci-eczaneler', async (req, res) => {
  const {city, county} = req.query;
  console.log(city, county);
  const authKey = process.env.API_AUTH_KEY;
  const apiUrl = `https://www.nosyapi.com/apiv2/pharmacy?city=${city}&county=${
    county || ''
  }`;
  console.log(apiUrl);
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
});

const port = process.env.PORT || 3001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
