const express = require('express');
const router = express.Router();
const{auth}=require('../middlewares/auth')
const {createOrder,getAllOrders,getOrderById,updateOrder,deleteOrder}=require('../controllers/ordercontroller');

router.post('/',auth,createOrder)
router.get('./',auth,getAllOrders)
router.get('/:id',getOrderById)
router.put('/:id',updateOrder)
router.delete('/:id',deleteOrder)

module.exports = router;
