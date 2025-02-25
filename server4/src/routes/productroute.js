const express=require('express')
const router=express.Router()
const{auth,adminOnly}=require('../middlewares/auth')

const{createProduct,getAllProducts,getProductById,updateProduct,deleteProduct}=require('../controllers/productcontroller')
router.post('/',auth,adminOnly,createProduct)
router.get('/',getAllProducts)
router.get('/:id',getProductById)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)

module.exports=router;