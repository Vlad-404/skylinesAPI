const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');

// Load environmental variables
dotenv.config({
    path: './config/config.env'
});

// Route files
const broken = require('./routes/broken');

const app = express();

// Enable detailed error reporting for dev env through morgan middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Body parser
app.use(express.json())

// Set static folder
app.use(express.static('public'))

// Mount Routes
app.use('/broken', broken);

// Error handling
// 404
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
    if (err) {
        return console.log('Error: ', err);
    }
    console.log(`Server running at port: ${PORT}`)
})
