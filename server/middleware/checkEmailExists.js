import User from "../models/User.js";
// Middleware function to check if email already exists
export const checkEmailExists = async (req, res, next) => {
    try {
      const email = req.body.email;
  
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      // If email doesn't exist, proceed to the next middleware/route
      next();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  
  