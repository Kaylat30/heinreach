import express from "express"
import {getCart,addToCart} from "../controllers/Cart.js"
import { verifytoken } from "../middleware/auth.js"

const router = express.Router()

router.get("/cart",verifytoken,getCart)
router.post("/addToCart",verifytoken,addToCart)
export {getCart,addToCart}