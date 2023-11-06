// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const verifytoken = async(req,res,next)=>{
//     // try {
//     //     let token = req.header("Authorization")

//     //     if(!token)
//     //     {
//     //        return res.status(403).send("Access Denied") 
//     //     }

//     //     if(token.startsWith("Bearer "))
//     //     {
//     //         token = token.slice(7,token.length).trimLeft()
//     //     }

//     //     const verified = jwt.verify(token, process.env.JWT_SECRET)
//     //     const user = await User.findById(verified.id);

//     //     if (!user) {
//     //         return res.status(403).send("Invalid User");
//     //     }

//     //     req.user = user;
//     //     next()
//     // } catch (err) {
//     //     res.status(500).json({error: err.message})
//     // } 

// //     try {
// //         const authHeader = req.headers["Authorization"]
// //         const token = authHeader && authHeader.split(' ')[1]
// //         if(token == null) return res.sendStatus(401)

// //         jwt.verify(token,process.env.JWT_SECRET,(err,id)=>{
// //             if(err) return res.status(403).send("Invalid User")
// //             req.user = id
// //             next()
// //         })
        
// //     } catch (error) {
// //         res.status(500).json({error: err.message})
// //     }
// // }

// // export const checkAuthenticated = async(req,res,next)=>{

// //     if(req.isAuthenticated())
// //     {
// //         return next()
// //     }

// //     res.redirect('/login')

// // }

// // export const checkNotAuthenticated = async(req,res,next)=>{

// //     if(req.isAuthenticated())
// //     {
// //         res.redirect('/')
// //     }

// //     next()

// // }