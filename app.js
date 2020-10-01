const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

const productRouts = require('./api/routes/products');
const orderRouts = require('./api/routes/orders');

app.use('/products', productRouts);
app.use('/orders', orderRouts);

app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;