import express from "express";
import {logout, register,login} from "../controllers/auth.js"
import { checkEmailExists } from "../middleware/checkEmailExists.js";

const router = express.Router()
router.post("/login",login)
router.post("/signup",checkEmailExists,register)
router.post("/logout",logout)

export {register,logout,login}