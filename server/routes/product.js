import express from "express"
import {addProducts, getProducts, getProductInfo} from "../controllers/Product.js"
import { verifytoken } from "../middleware/auth.js"

const router = express.Router()

router.post("/addproducts",addProducts)
router.get("/shop",verifytoken,getProducts)
router.get("/product/:id",getProductInfo)

export {addProducts,getProducts,getProductInfo}