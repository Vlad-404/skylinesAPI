const dotenv = require('dotenv');
const express = require('express');

// Load environmental variables
dotenv.config({
    path: './config/config.env'
})

const app = express();

// Routes
app.get('/', (req, res, next) => {
    res.send('<h2>API is online</h2>')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {console.log(`Server running at port: ${PORT}`)});