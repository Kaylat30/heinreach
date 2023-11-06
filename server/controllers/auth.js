import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import Cart from "../models/Cart.js"
import passport from "passport"

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
// export const login = async(req,res)=>{
//     try {
//         const {email, password} = req.body

//         //find user
//         const user = await User.findOne({email:email})

//         //if user does not exist
//         if (!user) return res.status(400).json({msg: "User does not exist"})

//         //if user exists, we match the password sent with the existing encrypted password
//         const isMatch = await bcrypt.compare(password, user.password)

//         if(!isMatch) return res.status(400).json({msg: "Invalid username or password"})

//         const token = jwt.sign({ id: user._id,name:user.firstname }, process.env.JWT_SECRET,{expiresIn: '12h'})
//         //const refreshtoken = jwt.sign({ id: user._id,name:user.firstname }, process.env.JWT_SECRET,{expiresIn: '12h'})
//         delete user.password

//         // After successful login, check if there are items in the cart with the user's session ID
//         const sessionID = req.sessionID;
//         const cartItemsToUpdate = await Cart.find({ sessionID: sessionID });

//         if (cartItemsToUpdate.length > 0) {
//             // Update the user field to associate these items with the logged-in use
//             const userID = user._id;
//             await Cart.updateMany(
//                 { _id: { $in: cartItemsToUpdate.map((item) => item._id) }, user: null },
//                 { user: userID }
//             );
//         }

//         res.status(200).json({token:token, user:user})
//     }catch(err)
//     {
//         res.status(500).json({error: err.message})
//     }
// } 
export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      req.logIn(user, async(err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // After successful login, check if there are items in the cart with the previous session ID
        const oldsessionID = req.cookies.previousSessionID;
        
        const cartItemsToUpdate = await Cart.find({ session: oldsessionID });

        if (cartItemsToUpdate.length > 0) {
            // Update the user field to associate these items with the logged-in use
            const userID = user._id;
            await Cart.updateMany(
                { _id: { $in: cartItemsToUpdate.map((item) => item._id) }, user: null },
                { user: userID ,session: null }
            );
        }
         
        res.status(200).json({ user });
      });
    })(req, res, next);
    
};
  

export const logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.status(200).json({ message: 'Logged out successfully' });
        }) 
   
};
