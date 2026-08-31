import { Schema, model } from "mongoose";

const CategorySchema = Schema({
    name: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        unique: true
    },
    state: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export default model("Category", CategorySchema);