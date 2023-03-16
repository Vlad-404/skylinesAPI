const dotenv = require('dotenv');
const express = require('express');

// Load environmental variables
dotenv.config({
    path: './config/config.env'
});

const app = express();

// Import routes
const broken = require('./routes/broken');

// Routes
app.get('/', (req, res, next) => {
    res.send('<h2>API is online</h2>')
});
app.get('/broken', broken);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server running at port: ${PORT}`)});
