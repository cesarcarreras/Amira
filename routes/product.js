const router = require('express').Router();
const { createProduct, getAllProducts, updateProduct, oneProduct, deleteProduct } = require('../controllers/products.controller');
const uploadCloud = require('../helpers/cloudinary');

router.post('/create-product', uploadCloud.array('img', 5) ,createProduct);
router.get('/all-products', getAllProducts);
router.get('/product-detail/:id', oneProduct)
router.patch('/update-product', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

module.exports = router;