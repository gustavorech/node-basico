const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling GET request to /order 111'
    });
});

router.post('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling POST request to /order'
    });
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