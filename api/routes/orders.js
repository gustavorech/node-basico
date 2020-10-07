const { request } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const Order = require('../models/order');

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling GET request to /order 111'
    });
});

router.post('/', async (request, response, next) => {
    try {
        await Product.findById(request.body.productId)
    } catch (error) {
        return response.status(500).json({
            message: 'Product does not exists',
            error: error
        })
    }

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: request.body.quantity,
        product: request.body.productId
    });

    try {
        await order.save();
        console.log(order);

        response.status(201).json({_id: order._id});
    } catch(error) {
        console.log(error);
        response.status(500).json({error: error});
    }
});

router.get('/:orderId', (request, response, next) => {
    const id = request.params.orderId;
    if (id === 'special') {
        response.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    }
    else {
        response.status(200).json({
            message: 'You passed an ID',
            id: id
        });
    }
});

router.patch('/', (request, response, next) => {
    response.status(200).json({
        message: 'Updated order',
    });
});

router.delete('/', (request, response, next) => {
    response.status(200).json({
        message: 'Deleted order',
    });
});

module.exports = router;