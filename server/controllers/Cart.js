import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

//add Cart items 
export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const sessionID = req.sessionID;
        console.log("req.user:", req.user);
        console.log("Is req.user undefined?", req.user === undefined);
        console.log("sessionID:", sessionID);


        if (!productId) {
            return res.status(400).json({ error: 'productId is required' });
        }

        let product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const cartQuery = req.user !== undefined
            ? { product: productId, user: req.user._id }
            : { product: productId, session: sessionID };

        let cartItem = await Cart.findOne(cartQuery);

        if (cartItem) {
            // Increment the quantity if the item already exists in the cart
            cartItem.amount += 1;

            // Update the final price based on the updated quantity
            cartItem.finalprice = cartItem.amount * product.finalprice;
        } else {
            // Create a new cart item
            cartItem = new Cart({
                image: product.image,
                name: product.name,
                quantity: product.quantity,
                amount: 1,
                finalprice: product.finalprice,
                discount: product.discount,
                product: productId,
                user: req.user !== undefined ? req.user._id : null,
                session: req.user !== undefined ? null : sessionID,
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
    
    const query = req.user
        ? { user: req.user._id }
        : { session: req.sessionID };
  
      const cartItems = await Cart.find({});
  
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

//update Cart items
// export const updateCart = async (req, res) => {
//     try {
//       const { productId } = req.body;
//       const sessionID = req.sessionID;
  
//       if (!productId) {
//         return res.status(400).json({ error: 'productId is required' });
//       }
  
//       let product = await Product.findById(productId);
  
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
  
//       const cartQuery = req.user
//         ? { product: productId, user: req.user.id }
//         : { product: productId, session: sessionID };
  
//       let cartItem = await Cart.findOne(cartQuery);
  
//       if (cartItem) {
//         // Increment the quantity if the item already exists in the cart
//         cartItem.amount += 1;
  
//         // Update the final price based on the updated quantity
//         cartItem.finalprice = cartItem.amount * product.finalprice;
  
//         const savedCart = await cartItem.save();
//         return res.status(200).json(savedCart);
//       } else {
//         return res.status(404).json({ error: 'Cart item not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
  

