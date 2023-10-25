import express, { response } from "express";
import mongoose from "mongoose";
import session from 'express-session';
import cors from "cors"
import path from "path"
import dotenv from "dotenv";
import { login,register,logout } from "./routes/auth.js"
import {addProducts,getProducts,getProductInfo} from "./routes/product.js"
import {getCart,addToCart} from "./routes/cart.js"

// Configurations
const  app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET','POST','PACTH','DELETE','PUT'],
    allowedHeaders: ['Content-Type'],
}))
dotenv.config(); // Load environment variables from .env file


//MIDDLEWARE
// Initialize the session middleware
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    })
);   

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
app.use("/logout",logout)
app.use("/addproducts",addProducts)
app.use("/shop",getProducts)
app.use("/product/:id",getProductInfo)
app.use("/addToCart",addToCart)
app.use("/cart",getCart)

//app.use("/users", userRoute)

