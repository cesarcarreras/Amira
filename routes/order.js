const router = require('express').Router();
const { createOrder, getAllOrders, oneOrder, updateOrder, deleteOrder } = require('../controllers/order.controller');

router.post('/create-order',createOrder);
router.get('/all-orders', getAllOrders);
router.get('/order-detail/:id', oneOrder)
router.patch('/update-order', updateOrder);
router.delete('/delete-order/:id', deleteOrder);

module.exports = router;