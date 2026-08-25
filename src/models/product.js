import { Schema, model } from "mongoose";

const ProductSchema = Schema({
    name: {
        type: String,
        require: [true, "El nombre es obligatorio"],
        unique: true
    },
    state: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    stock: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/005/720/408/non_2x/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
    }
});

export default model("Product", ProductSchema);