const { request } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', async (request, response, next) => {
    try {
        const products = await Product.find().exec();
        console.log(products);

        response.status(200).json(products);
    } catch (error) {
        console.log(error);
        response.status(500).json({error: error});
    }
});

router.post('/', async (request, response, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price
    });

    try {
        await product.save();
        console.log(product);

        response.status(200).json({createdProduct: product});
    } catch(error) {
        console.log(error);
        response.status(500).json({error: error});
    }
});

router.get('/:productId', async (request, response, next) => {
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
});

router.patch('/:productId', async (request, response, next) => {
    const id = request.params.productId;

    try {
        const result = await Product.update({_id: id}, {$set: request.body});
        console.log(result);

        response.status(200).json(result);
    } catch(error) {
        console.log(error);

        response.status(500).json({error: error});
    }
});

router.delete('/:productId', async (request, response, next) => {
    const id = request.params.productId;

    try {
        const result = await Product.remove({_id: id}).exec();
        response.status(200).json(result);

    } catch (error) {
        console.log(error);
        response.status(500).json({error: error});
    }
});

module.exports = router;