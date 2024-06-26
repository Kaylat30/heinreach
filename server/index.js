import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import path from "path"
import dotenv from "dotenv";
import { register,logout,login } from "./routes/auth.js"
import {addProducts,getProducts,getProductInfo} from "./routes/product.js"
import {getCart,addToCart,deleteCart,updateCartAmount,checkout} from "./routes/cart.js"
import flash from "express-flash";
import passport from "passport";
import cookieParser from "cookie-parser";
import { initializePassport } from "./middleware/passport.js";
import Cart from "./models/Cart.js";
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';


//const url = 'http://localhost:5174'
const url = 'https://heinreach.vercel.app'
// Configurations
const  app = express()
app.use(express.json())
app.use(cors({
    origin: url,
    methods: ['GET','POST','PATCH','DELETE','PUT'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}))
dotenv.config(); // Load environment variables from .env file

//MIDDLEWARE 
//AUTHENTICATION    

initializePassport(passport)   

const sessionStore = new (MongoDBStore(session))({
    uri: process.env.MONGO_URL, // MongoDB connection URL
    collection: 'sessions', // Collection to store sessions in
    autoRemove: 'interval', // Automatically remove expired sessions
    autoRemoveInterval: 5, // Interval in minutes for session cleanup
}); 

// Remove cart items for expired sessions
sessionStore.on('expired', async (session) => {
    console.log(`Session expired: ${session.id}`);
    try {
        await Cart.deleteMany({ session: session.id });
        console.log(`Cart items deleted for expired session: ${session.id}`);
    } catch (error) {
        console.error(`Error deleting cart items: ${error.message}`);
    }
});


app.set('trust proxy', 1)
app.use(flash()) 
app.use(session({
    secret: process.env.JWT_SECRET,
    name: 'sessionId',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie:{
        maxAge: 300000, 
        httpOnly: true,
        secure:true,    
        sameSite: 'none'  
    }
}))
app.use(cookieParser(process.env.JWT_SECRET));
app.use(passport.initialize())
app.use(passport.session())    



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
app.use("/deleteCart",deleteCart)
app.use("/updateCartAmount",updateCartAmount)
app.use("/checkout",checkout)



