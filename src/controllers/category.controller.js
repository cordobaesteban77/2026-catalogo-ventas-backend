import Category from "../models/category.js";

// obtener categorias
const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// crear categoria
const createCategory = async (req, res) => {
    try {
        const name = req.body.name.toUpperCase();
        const validateName = await Category.findOne({ name });
        if (validateName) {
            res.status(400).json({ ok: false, message: `La categoría ${name} ya existe` });
        }
        const category = new Category({ name });
        category.save();
        res.status(201).json({ ok: true, message: `La categoria ${name} se creó con éxito` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: error.message })
    }
};

export { getCategory, createCategory };