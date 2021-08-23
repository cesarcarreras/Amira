const router = require('express').Router();
const { createProduct, getAllProducts, updateProduct, oneProduct, deleteProduct } = require('../controllers/products.controller');

router.post('/create', createProduct);
router.get('/all-products', getAllProducts);
router.get('/detail/:id', oneProduct)
router.patch('/update-product', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;