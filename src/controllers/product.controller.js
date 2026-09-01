import Product from "../models/Product.js";

// obtener productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ ok: true, products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// obtener productos
const getActiveProducts = async (req, res) => {
    try {
        const products = await Product.find({ state: true }).populate("user", "username email role");
        res.status(200).json({ ok: true, products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// crear producto
const createProduct = async (req, res) => {
    try {
        const { price, description, category, img } = req.body;
        const name = req.body.name.toUpperCase();
        // validacion si existe un producto con ese nombre
        const productDB = await Product.findOne({ name });
        if (productDB) {
            return res.status(400).json({ ok: true, message: `El producto con el nombre ${productDB.name} ya existe` });
        }
        const data = { name, price, description, category, user: req.user._id };
        const product = new Product(data);
        await product.save();
        res.status(201).json({ ok:true, message: `El producto ${data.name} se guardó correctamente` })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// actualizar producto
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { price, category, description, stock } = req.body;
        // cuerpo que le mando a mongoose para que actualice la DB
        let data = { price, category, description, stock };
        if (req.body.name) {
            // le agrego al objeto data la propiedad name
            data.name = req.body.name.toUpperCase();
        }
        await Product.findByIdAndUpdate(id, data);
        res.status(200).json({ ok: true, message: "Producto actualizado con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// desactivar producto
const changeStateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productChangeState = await Product.findById(id);
        productChangeState.state = !productChangeState.state;
        await productChangeState.save()
        res.status(200).json({ ok: true, message: "Estado del producto actualizado" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// eliminar producto
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ ok: true, message: "Producto eliminado con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

export { getProducts, getActiveProducts, createProduct, updateProduct, changeStateProduct, deleteProduct };