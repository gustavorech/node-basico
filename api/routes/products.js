
const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products');

router.get('/', ProductController.get_all);

router.post('/', ProductController.create);

router.get('/:productId', ProductController.get);

router.patch('/:productId', ProductController.update);

router.delete('/:productId', ProductController.delete);

module.exports = router;