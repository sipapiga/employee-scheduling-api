const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./src/middleware/error');
const { connectDB } = require('./src/database/database');
const router = require('./src/routes/router');

dotenv.config({ path: './config/config.env' });

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', ((req, res) => res.status(200).json('TEST')));
app.use('/', router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  await connectDB();
});
