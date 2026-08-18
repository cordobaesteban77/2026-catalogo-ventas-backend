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
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// actualizar categoria
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        // validar que no exista una categoria con el mismo nombre
        const validateName = await Category.findOne({ name: name.toUpperCase() });
        if (validateName) {
            return res.status(400).json({ ok: false, message: "Ya existe una categoria con ese nombre" });
        }
        // validar que el id exista en la base de datos
        const data = { name: name.toUpperCase() };
        const category = await Category.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({ ok: true, message: "Categoria actualizada", category });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// desactivar categoria (NO BORRAR)
const changeCategoryState = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryChangeState = await Category.findByIdAndUpdate(id, { new: true });
        categoryChangeState.state = !categoryChangeState.state;
        await categoryChangeState.save();
        res.status(200).json({ ok: true, message: "Estado de la categoria actualizado" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// borrar categoria
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).json({ ok: true, message: "Categoria eliminado con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500),json({ ok: false, error: error.message });
    }
};

export { getCategory, createCategory, updateCategory, changeCategoryState, deleteCategory };