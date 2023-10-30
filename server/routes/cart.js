import express from "express"
import {getCart,addToCart,deleteCart,updateCartAmount} from "../controllers/Cart.js"
import { verifytoken } from "../middleware/auth.js"

const router = express.Router()

router.get("/cart",verifytoken,getCart)
router.post("/addToCart",verifytoken,addToCart)
router.post("/deleteCart",verifytoken,deleteCart)
router.patch("/updateCartAmount",updateCartAmount)
export {getCart,addToCart,deleteCart,updateCartAmount}