const express = require('express');

const app = express();

// Routes
app.get('/', (req, res, next) => {
    res.send('<h2>API is online</h2>')
})

app.listen(3000, () => {console.log('Server running')});