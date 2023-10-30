import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        image: String,
        name: String,
        quantity: Number,
        amount:Number,
        finalprice: Number,
        initialprice:Number,
        discount: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        sessionID: String,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart",CartSchema)
export default Cart