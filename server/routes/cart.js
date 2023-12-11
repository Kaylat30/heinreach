    import express from "express"
    import {getCart,addToCart,deleteCart,updateCartAmount,checkout} from "../controllers/Cart.js"
    import { checkAuthenticated } from "../middleware/passport.js"
    const router = express.Router()

    router.post("/cart",checkAuthenticated,getCart)
    router.post("/addToCart",checkAuthenticated,addToCart)
    router.post("/deleteCart",checkAuthenticated,deleteCart)
    router.patch("/updateCartAmount",updateCartAmount)
    router.post('/checkout',checkAuthenticated,checkout);
    export {getCart,addToCart,deleteCart,updateCartAmount,checkout}
     