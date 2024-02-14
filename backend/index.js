const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const router = require('./routes/index');

const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(cors());
app.use('/public/videos', express.static('public/videos'));

app.use(router);

app.listen(PORT);
console.log(`Server running son port ${PORT}`);