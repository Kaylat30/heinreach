import Product from "../models/Product.js"
import User from "../models/User.js"

//add products
export const addProducts = async (req,res) =>
{
    try {
        const {
            name,
            image,
            initialprice,
            discount,
            description,
            category,
            quantity
        } = req.body

        // Calculate the final price based on the initial price and discount percentage
        const finalprice = initialprice - (initialprice * (discount / 100));

        const newProduct = new Product({
            name,
            image,
            initialprice,
            discount,
            finalprice,
            description,
            category,
            quantity
        })

        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

//get all products
export const getProducts = async (req,res) =>
{

    try {
        let products = await Product.find({})

        return res.status(200).json(products)
    } catch (error) {
        res.status(500).send({error : error.message})
    }
}

//get product details
export const getProductInfo = async (req,res) =>
{
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        return res.status(200).json(product)
    } catch (error) {
        res.status(500).send({error : error.message})
    }
}

