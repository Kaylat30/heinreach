import bcrypt from "bcrypt"
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
 
      res.cookie('firstname', JSON.stringify({firstname:user.firstname}), {
        maxAge: 60000, 
        secure: process.env.NODE_ENV === 'production' ? 'true':'false',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
        domain: 'heinreach.vercel.app',
        path: '/'
      }); 


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
         
        res.status(200).json({success : true , message: "logged in successfully" });
      });
    
    })(req, res, next); 
};
  

export const logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.status(200).json({ message: 'Logged out successfully' });
        }) 
   
};
