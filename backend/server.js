import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.post("/api/products", async (req, res) => {
    console.log(`Request Body: ${req}`);
    const product = req.body;
    
    if(!product.name || !product.price) {
        return res.status(400).json({message: "Please provide complete details."});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({sucess: true, data: newProduct}); 
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({success: false, message: "Error"});
    }
}
)

app.listen(port, () => {
    connectDB();
    console.log(`Server started at ${port}`);
})
