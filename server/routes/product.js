import express from "express"
import {addProducts, getProducts, getProductInfo} from "../controllers/Product.js"
import { checkAuthenticated } from "../middleware/passport.js"
import passport from 'passport';

const router = express.Router()

router.post("/addproducts",addProducts)
router.get("/shop",checkAuthenticated,getProducts)
router.get("/product/:id",getProductInfo)

export {addProducts,getProducts,getProductInfo}