import express from 'express';
import { dbConnect } from './config/db.js';
import productRoutes from "./routes/product.routes.js"

const app = express();
const PORT = process.env.PORT || 4500;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
app.use("/api/products", productRoutes);

//Conexíon a base de datos
await dbConnect();

app.listen(PORT, () => console.log(`✅ Server online on port: ${PORT}`));