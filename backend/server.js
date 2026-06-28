import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server started at ${port}`);
})
