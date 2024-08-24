const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./utils/rateLimiter');
const connectDB = require('./config/db');
const routes = require('./routes');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimiter); // Apply rate limiting middleware
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
