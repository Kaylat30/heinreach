import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            max:20,
        },
        image:{
            type:String,
            required:true,
        },
        initialprice:{
            type: Number,
            required:true,
        },
        finalprice:{
            type: Number,
            required:true,
        },
        quantity:{
            type: Number,
            required:true,
        },
        discount:{
            type: Number,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        category:{
            type:String,
            required:true,
        },
    },
    {timestamps: true}
)

const Product = mongoose.model("Product",ProductSchema)
export default Product