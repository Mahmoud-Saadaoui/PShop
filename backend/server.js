import express from "express";
import dotenv from "dotenv";
import productRoutes from './routes/productRoutes.js'
dotenv.config();
import connectDB from "./config/db.js"
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
const port = process.env.PORT || 5000;

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running ...')
}) 

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))