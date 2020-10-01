const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling GET request to /products'
    });
});

router.post('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling POST request to /products'
    });
});

router.get('/:productId', (request, response, next) => {
    const id = request.params.productId;
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
        message: 'Updated product',
    });
});

router.delete('/', (request, response, next) => {
    response.status(200).json({
        message: 'Deleted product',
    });
});

module.exports = router;