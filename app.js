const express = require('express');
const app = express();

const productRouts = require('./api/routes/products');
const orderRouts = require('./api/routes/orders');

app.use('/products', productRouts);
app.use('/orders', orderRouts);

module.exports = app;