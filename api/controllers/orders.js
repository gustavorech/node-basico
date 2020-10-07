
const mongoose = require('mongoose');
const Product = require('../models/product');
const Order = require('../models/order');

exports.create = async (request, response, next) => {
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
};

exports.get_all = async (request, response, next) => {
    const id = request.params.orderId;
    try {
        const orders = await Order.find()
            .select('product quantity _id')
            .populate('product', 'name')
            .exec();

        response.status(200).json({
            data: orders
        });
    } catch(error) {
        console.log(error);
        response.status(500).json({error: error});
    }
};

exports.get = (request, response, next) => {
    response.status(200).json({
        message: 'Handling GET request to /order 111'
    });
};

exports.update = (request, response, next) => {
    response.status(200).json({
        message: 'Updated order',
    });
};

exports.delete = (request, response, next) => {
    response.status(200).json({
        message: 'Deleted order',
    });
};