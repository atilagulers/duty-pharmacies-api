import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import connectDB from './db/connect.js';
import {updatePharmacies} from './utils/scheduler.js';

import errorHandlerMiddleware from './middleware/errorHandler.js';
import notFoundMiddleware from './middleware/notFound.js';

const app = express();

// config
app.use(helmet());
app.use(express.json());
app.use(cors());

// routers
import pharmaciesRouter from './routes/pharmacies.js';



// routes
app.use('/api/v1/pharmacies', pharmaciesRouter);

app.get('/api/v1/update', async (req, res) => {
  try {
    await updatePharmacies();
    res.send('pharmacies updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating pharmacies');
  }
})


app.get('/api/v1', (req, res) => {
  res.send('Welcome !');
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    //await updatePharmacies();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
