const dotenv = require('dotenv');
const express = require('express');
// Utility imports
const errorHandler = require('./middleware/error.js')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// DB import
const connectDb = require('./config/db.js');

// Load environmental variables
dotenv.config({
    path: './config/config.env'
});

connectDb();

// Route files
const broken = require('./routes/broken');
const auth = require('./routes/auth');

const app = express();

// Enable detailed error reporting for dev env through morgan middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser());

// Set static folder
app.use(express.static('public'))

// Mount Routes
app.use('/broken', broken);
app.use('/auth', auth);
app.use('/', (req, res, next) => {
    res.sendFile('./public/index.html');
});
app.use(errorHandler);

// Error handling
// 404
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that! Please check your request.")
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
    if (err) {
        return console.log('Error: ', err);
    }
    console.log(`Server running at port: ${PORT}`)
})
