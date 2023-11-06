import express from "express"
import {getCart,addToCart,deleteCart,updateCartAmount} from "../controllers/Cart.js"
import { checkAuthenticated } from "../middleware/passport.js"
const router = express.Router()

router.get("/cart",checkAuthenticated,getCart)
router.post("/addToCart",checkAuthenticated,addToCart)
router.post("/deleteCart",checkAuthenticated,deleteCart)
router.patch("/updateCartAmount",updateCartAmount)
export {getCart,addToCart,deleteCart,updateCartAmount}