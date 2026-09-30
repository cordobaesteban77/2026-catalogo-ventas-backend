import User from "../models/User.js";
import { sendVerificationEmail } from "../config/nodemailer.js";
import { generateToken } from "../utils/jwt.js";

// obtener el perfil del usuario
const getProfile = async (req, res) => {
    try {
        const { username, email, role, emailVerified } = req.user;
        res.json({ success: true, data: { username, email, role, emailVerified } });
    } catch (error) {
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// registrar usuario
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
        return res.status(201).json({ ok: true, message: "Usuario creado con éxito, por favor ahora revise su correo y verifique su usuario", data: { username: user.username, email: user.email } });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// verificar usuario
const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;
        // buscar el usuario con el email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ ok: false, message: "Usuario no econtrado" });
        }
        // verificar que el código coincida !== significa que es distinto
        if(user.verificationCode !== code) {
            return res.status(400).json({ ok: false, message: "Código de verificacíon incorrecto" });
        }
        // verificar que el usuario no esté ya validado
        if(user.emailVerified) {
            return res.status(400).json({ ok: false, message: "El usuario ya está verificado" });
        }
        // verificar que el código no haya expirado
        if(user.verificationCodeExpires < Date.now()) {
            return res.status(400).json({ ok: false, message: "El código de verificación ya expiró" });
            // marcar el email como verificado y limpiar el código
        }
        user.emailVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        await user.save();
        return res.status(200).json({ ok: true, message: "Email verificado correectamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// generar codigo de verificacion
const generateVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        const { username } = user;
        const verificationCode = user.generateVerificationCode();
        await user.save();
        try {
            await sendVerificationEmail(email, username, verificationCode);
        } catch (error) {
            console.error("Error al enviar el email", error);
        }
        return res.status(200).json({ ok: true, message: "Código generado con éxito, revise su correo para verificarlo" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// login
const  login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if(!user) {
            return res.status(401).json({ ok: false, message: "Correo o contraseña incorrectos" });
        }
        // chequear que la password coincida
        const isPasswordValid = user.comparePassword(password);
        if(!isPasswordValid) {
            return res.status(403).json({ ok: false, message: "Correo o contraseña incorrectos" });
        }
        // chequear si tiene el código verificado
        if(!user.emailVerified) {
            return res.status(403).json({ ok: false, message: "Por favor verifique su email para poder acceder" });
        }
        // generar el token
        const token = generateToken(user._id);
        // setear la cookie
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000 // 1h
        };
        res.cookie('token', token, cookieOptions);
        res.status(200).json({ ok: true, message: "Usuario logueado con éxito!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, error:error.message });
    }
};

// logout
const logout = (req, res) => {
    try {
        // chequear que exista el token: se puede hacer tambien agregando el middleware authenticate entre la ruta y el controlador
        if(req.cookies.token) {
            // limpiar la cookie llamada token
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "lax"
            })
            return res.status(200).json({ ok: true, message: "Sesión cerrada con éxito" });
        }
        return res.status(401).json({ ok: false, message: "No hay un usuario logueado" });
    } catch (error) {
        return res.status(500).json({ ok: false, error:error.message });
    }
};

// actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        let data = { username, email };
        await User.findByIdAndUpdate(id, data);
        return res.status(200).json({ ok: true, message: "Usuario actualizado con éxito" });
    } catch (error) {
        return res.status(500).json({ ok: false, error: error.message });
    }
};

// cambiar rol de un usuario
const changeUserRole = async (req, res) => {
    try {
        const { role } = req.user;
        if (role === "superAdmin") {
            const { id } = req.params;
            const { role } = req.body;
            let data = { role };
            await User.findByIdAndUpdate(id, data);
            return res.status(200).json({ ok: true, message: "Rol cambiado con éxito" });
        }
        return res.status(403).json({ ok: false, message: "No tiene permiso para cambiar el rol de un usuario" });
    } catch (error) {
        return res.status(500).json({ ok: false, error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { role } = req.user;
        if (role === "superAdmin") {
            const { id } = req.body;
            await User.findByIdAndDelete(id);
            return res.status(200).json({ ok: true, message: "Usuario eliminado con éxito" });
        }
        return res.status(403).json({ ok: false, message: "No tiene permiso para eliminiar un usuario" });
    } catch (error) {
        return res.status(500).json({ ok: false, error: error.message });
    }
};

export { register, verifyEmail, login, logout, getProfile, updateUser, deleteUser, changeUserRole, generateVerificationCode };