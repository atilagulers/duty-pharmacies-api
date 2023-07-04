require('dotenv').config();
const helmet = require('helmet');

const pharmacyRouter = require('./routes/pharmacy');

// express
const express = require('express');
var cors = require('cors');
const app = express();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());

// routes

app.use('/api/v1/pharmacy', pharmacyRouter);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
