import express from 'express';
import { dbConnect } from './config/db.js';
import morgan from 'morgan';
import productRoutes from "./routes/product.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 4500;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// rutas
app.use("/api/products", productRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);

//Conexíon a base de datos
await dbConnect();

app.listen(PORT, () => console.log(`✅ Server online on port: ${PORT}`));