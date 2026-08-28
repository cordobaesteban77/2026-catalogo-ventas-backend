import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "superAdmin"],
        default: "user"
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    verificationCodeExpires: {
        type: Date,
    }
},
{ timestamps: true });

// hash password
UserSchema.pre('save', async function() {
    if (!this.isModified("password")) {
        return
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// generar codigo de verificacion
UserSchema.methods.generateVerificationCode = function() {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // codigo de 6 digitos
    this.verificationCode = code;
    this.verificationCodeExpires = Date.now() + 15 * 60 * 1000; // duracion del codigo 15 min
    return code;
};

// comparar contraseñas
UserSchema.methods.comparePassword = function(userPassword) {
    return bcrypt.compareSync(userPassword, this.password); // devuelve un booleano
};

const User = mongoose.model("User", UserSchema);

export default User;