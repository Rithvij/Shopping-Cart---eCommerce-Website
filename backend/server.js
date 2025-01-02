import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"

//APP config

const app=express()
const port = process.env.PORT || 4000   //defining port number
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())


// API endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>console.log("Server started on Port: "+port))