import express from "express";
import {login, register} from "../controllers/auth.js"
import { verifytoken } from "../middleware/auth.js"
import User from "../models/User.js";

const router = express.Router()
router.post("/login",login)
router.post("/signup",register)

export {login, register}