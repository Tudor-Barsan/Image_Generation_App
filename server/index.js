import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

// middleware
const corsOptions = {
  origin: "YOUR_FRONTEND_URL", // frontend URI (ReactJS)
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.send('Hello from the backend!');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server listening on port http://localhost:8080'))
  } catch (err) {
    console.log(err);
  }
}

startServer();