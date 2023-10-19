import Product from "../models/Product.js"
import User from "../models/User.js"

//add products
export const addProducts = async (req,res) =>
{
    try {
        const {
            name,
            image,
            price,
            discount,
            description,
            category,
            quantity
        } = req.body

        const newProduct = new Product({
            name,
            image,
            price,
            discount,
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

        const {cat,dis,maxprice,minprice} = req.query

        //filter products by category
        if(cat)
        {
          products = products.filter((product)=>{
            return product.category == cat
          })  
        }

        // Filter products by discount percentage
        if (dis) {
            const minDiscount = parseFloat(dis); // Ensure dis is parsed as a number
            products = products.filter((product) => product.discount >= minDiscount);
        }

        // Filter products by price range (maxprice and minprice)
        if (maxprice && minprice) {
            const minPrice = parseFloat(minprice);
            const maxPrice = parseFloat(maxprice);
            products = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
        } else if (minprice) {
            const minPrice = parseFloat(minprice);
            products = products.filter((product) => product.price >= minPrice);
        } else if (maxprice) {
            const maxPrice = parseFloat(maxprice);
            products = products.filter((product) => product.price <= maxPrice);
        }

        //if no products matched the search
        if(products.length<1)
        {
            res.status(200).json({success:true,data:[],message:"No products matched your search"})
        }

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

