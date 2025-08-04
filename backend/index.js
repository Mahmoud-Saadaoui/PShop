import path from 'path'
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import cors from "cors"

const port = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// CORS configuration:
const allowedOrigins = [
  process.env.CLIENT_DEVELOPMENT_DOMAIN, 
  process.env.CLIENT_PRODUCTION_DOMAIN,  
];
app.use("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/banner", bannerRoutes)

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
