const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const router = require('./routes/index');

const PORT = process.env.PORT || 8080;

//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));
app.use('/public/videos', express.static('public/videos'));

app.use(router);

app.listen(PORT);
console.log(`Server running son port ${PORT}`);