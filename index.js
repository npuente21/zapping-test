const express = require('express');
const cors = require('cors');
const HLSServer = require('hls-server');
const app = express();
require('dotenv').config();
const router = require('./routes/index');

const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(cors())
app.use(router);
const hls = new HLSServer(app, {
    path: '/stream',     // Base URI to output HLS streams
    dir: 'public/videos',
    
    
});

app.listen(PORT);
console.log(`Server running son port ${PORT}`);