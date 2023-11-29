    import express, { response } from "express";
    import mongoose from "mongoose";
    import session from 'express-session';
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
    import MongoStore from "connect-mongo";
    import Cart from "./models/Cart.js";
    

    // Configurations
    const  app = express()
    app.use(express.json())
    app.use(cors({
        origin: "http://localhost:5173",
        methods: ['GET','POST','PATCH','DELETE','PUT'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    }))
    dotenv.config(); // Load environment variables from .env file

    //MIDDLEWARE 
    //AUTHENTICATION    

    initializePassport(passport)
    const sessionStore = new MongoStore({
        mongooseConnection: mongoose.connection,
        mongoUrl: process.env.MONGO_URL, // MongoDB connection URL
        collectionName: 'sessions', // Collection to store sessions in
        autoRemove: 'interval', // Automatically remove expired sessions
        autoRemoveInterval: 1, // Interval in minutes for session cleanup
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


    app.use(cookieParser(process.env.JWT_SECRET));
    app.use(flash())
    app.use(session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie:{
            maxAge: 60000, 
            httpOnly: true,
            //sameSite: 'None', 
            //secure: true,       
        }
    }))
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



