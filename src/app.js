import express from 'express';

const app = express();
const PORT = process.env.PORT || 4500;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
app.get("/", (req, res) => {
    res.status(200).json({ message: "Peticioón GET" })
})

app.listen(PORT, () => console.log(`✅Server online on port: ${PORT}`));