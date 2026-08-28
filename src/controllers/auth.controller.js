import User from "../models/User.js";
import { sendVerificationEmail } from "../config/nodemailer.js";
import { generateToken } from "../utils/jwt.js";

// controlador para el registro
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        // generar el código de verificación
        const verificationCode = user.generateVerificationCode();
        await user.save();
        // enviamos el email de verificación
        try {
            await sendVerificationEmail(email, username, verificationCode);
        } catch (error) {
            console.error("Error al enviar el email", error);
        }
        // envio respuesta al cliente
        res.status(201).json({ ok: true, message: "Usuario creado con éxito", data: { username: user.username, email: user.email } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, error: error.message });
    }
};

export { register };