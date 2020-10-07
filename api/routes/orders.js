
const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/orders');

router.get('/', OrderController.get_all);

router.post('/', OrderController.create);

router.get('/:orderId', OrderController.get);

router.patch('/:orderId', OrderController.update);

router.delete('/:orderId', OrderController.delete);

module.exports = router;