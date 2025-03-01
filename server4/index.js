const express=require('express')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const app=express()
require('dotenv').config()
const connectDB=require('./src/config/db')
const adminRoute=require('./src/routes/adminroute')
const orderRoute=require('./src/routes/orderroute')
const productRoute=require('./src/routes/productroute')
const userRoute=require('./src/routes/userroute')
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
      origin:process.env.FRONTEND_URL,
      credentials:true,
      methods:['GET','POST','PUT','DELETE'],
      allowedHeaders:['Content-Type','Authorization']
    }
))
app.get('/',(req,res)=>{
    res.send("Hello from backend")
})

app.use('/api/admin',adminRoute)
app.use('/api/order',orderRoute)
app.use('/api/product',productRoute)
app.use('/api/user',userRoute)
const PORT=process.env.PORT||2000
app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`)
})

