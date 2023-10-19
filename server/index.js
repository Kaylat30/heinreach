import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors"
import path from "path"
import dotenv from "dotenv";
import { login,register } from "./routes/auth.js"
import {addProducts,getProducts,getProductInfo} from "./routes/product.js"

// Configurations 
const  app = express()
app.use(express.json())
//app.use(cors)
dotenv.config(); // Load environment variables from .env file


// MONGOOSE SETUP
const PORT = process.env.PORT || 5000
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        app.listen(PORT, "localhost", ()=> console.log(`Server Port: ${PORT}`))
    }).catch((error)=> console.log(`${error} did not connect`))

// ROUTES
app.use("/login",login)
app.use("/signup",register)
app.use("/addproducts",addProducts)
app.use("/shop",getProducts)
app.use("/product/:id",getProductInfo)

//app.use("/users", userRoute)

    
   