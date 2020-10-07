
const mongoose = require('mongoose');

const Product = require('../models/product');

exports.get_all = async (request, response, next) => {
    try {
        const products = await Product.find().exec();

        const responseData = {
            count: products.length,
            data: products
        }

        console.log(products);

        response.status(200).json(responseData);
    } catch (error) {
        console.log(error);
        response.status(500).json({error: error});
    }
};

exports.create = async (request, response, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price
    });

    try {
        await product.save();
        console.log(product);

        response.status(201).json({_id: product._id});
    } catch(error) {
        console.log(error);
        response.status(500).json({error: error});
    }
};

exports.get = async (request, response, next) => {
    const id = request.params.productId;

    try {
        const product = await Product.findById(id).exec();

        if (product) {
            response.status(200).json(product);
        } else {
            response.status(404).json({message: 'Not found'});
        }

    } catch (error) {
        console.log(error);
        response.status(500).json({error: error});
    }
};

exports.update = async (request, response, next) => {
    const id = request.params.productId;

    try {
        const result = await Product.update({_id: id}, {$set: request.body});
        console.log(result);

        response.status(200).json(result);
    } catch(error) {
        console.log(error);

        response.status(500).json({error: error});
    }
};

exports.delete = async (request, response, next) => {
    const id = request.params.productId;

    try {
        const result = await Product.remove({_id: id}).exec();
        response.status(200).json(result);

    } catch (error) {
        console.log(error);
        response.status(500).json({error: error});
    }
};