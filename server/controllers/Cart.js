import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

//add Cart items 
export const addToCart = async (req, res) => {
    try {

      
        const { productId } = req.body;
        const sessionID = req.sessionID;

        if (!productId) {
            return res.status(400).json({ error: 'productId is required' });
        }

        let product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const cartQuery = req.user
            ? { product: productId, user: req.user._id }
            : { product: productId, session: sessionID };    

        let cartItem = await Cart.findOne(cartQuery);

        if (cartItem) {
            // Increment the quantity if the item already exists in the cart
            cartItem.amount += 1;

        } else {

          // Set the "previousSessionID" cookie
          res.cookie('previousSessionID', sessionID ,{
              maxAge: 60000, // Set an appropriate maxAge
              httpOnly: true, // For security
              secure: true,
            });
          
            // Create a new cart item 
            cartItem = new Cart({
                image: product.image,
                name: product.name,
                quantity: product.quantity,
                amount: 1,
                finalprice: product.finalprice,
                initialprice:product.initialprice,
                discount: product.discount,
                product: productId,
                user: req.user ? req.user._id : null,
                session: req.user ? null : sessionID,
            });
        }

        

        const savedCart = await cartItem.save();
        return res.status(201).json(savedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get Cart items
export const getCart = async (req, res) => {
    try {

      const query =req.user
      ? { user: req.user._id }
      : { session: req.sessionID } 
   
      const cartItems = await Cart.find(query);
  
      if (cartItems.length < 1) {
        return res.status(200).json({ 
          success: true,
          data: [],
          message: req.user
            ? 'No items in the cart for the authenticated user'
            : 'No items in the cart for the anonymous user',
        });
      } 
      
      return res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
};

//delete from Cart
export const deleteCart = async (req, res) => {
    try {
      const { cartItemId } = req.body;
      
      const deletedCartItem = await Cart.findByIdAndDelete(cartItemId);
  
      if (!deletedCartItem) {
        return res.status(404).json({
          success: false,
          message: 'Cart item not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Cart item deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  //Updating cart amount
  export const updateCartAmount = async (req, res) => {
    try {
      const { productId,newAmount } = req.body; 

      // Find the product by its ID and update the amount field
      const updatedProduct = await Cart.findByIdAndUpdate(
        productId,
        { amount: newAmount },
        { new: true } // Return the updated product
      );
  
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }
  
      return res.status(200).json({
        success: true,
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };

  //checking out cart items
  export const checkout = async (req, res) => {
    try {
        
        const userId = req.user._id;

        // Delete all cart items associated with the authenticated user
        await Cart.deleteMany({ user: userId });

        res.status(200).json({ success: true, message: 'Checkout successful' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
  
  

