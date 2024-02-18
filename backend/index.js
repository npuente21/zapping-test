const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const router = require('./routes/index');
const {createStream} = require('./controllers/streamController');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;

//Middlewares
app.use(morgan('common'));
app.use(cookieParser());
app.use(express.json());
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }
));
app.use('/public/videos', express.static('public/videos'));

app.use(router);

app.listen(PORT);

createStream().then(()=>console.log('Stream created')).catch((err)=>console.log(err));

console.log(`Server running son port ${PORT}`);