require('dotenv').config();

const dutyPharmaciesRouter = require('./routes/dutyPharmacies');
const citiesRouter = require('./routes/cities');
const countiesRouter = require('./routes/counties');
// express
const express = require('express');
var cors = require('cors');
const app = express();

// database
const connectDB = require('./db/connect');

// middlewares
app.use(express.json());
app.use(cors());

// routes

app.use('/api/v1/duty-pharmacies', dutyPharmaciesRouter);
app.use('/api/v1/cities', citiesRouter);
app.use('/api/v1/counties', countiesRouter);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
