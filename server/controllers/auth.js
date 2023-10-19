import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

//register user
export const register = async (req,res) =>
{
    try
    {
        const { 
            firstname,
            lastname,
            email,
            password
        } = req.body

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt) // encrypting password

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: passwordHash // we store the encypted password when new user registers
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser) // we're sending saved user back for fronted devs to use
    }catch(err)
    {
        res.status(500).json({error: err.message})
    }
}

// Logging in
export const login = async(req,res)=>{
    try {
        const {email, password} = req.body

        //find user
        const user = await User.findOne({email:email})

        //if user does not exist
        if (!user) return res.status(400).json({msg: "User does not exist"})

        //if user exists, we match the password sent with the existing encrypted password
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) return res.status(400).json({msg: "Invalid username or password"})

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({token, user})
    }catch(err)
    {
        res.status(500).json({error: err.message})
    }
}     