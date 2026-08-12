import express from 'express';
import { dbConnect } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 4500;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
app.get("/", (req, res) => {
    res.status(200).json({ message: "Peticioón GET" })
})

//Conexíon a base de datos
await dbConnect();

app.listen(PORT, () => console.log(`✅Server online on port: ${PORT}`));