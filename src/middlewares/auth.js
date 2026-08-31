import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
    try {
        // capturar el token directamente de la cookie (se usa req)
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({ ok: false, message: "La autenticación es requerida, por favor envia un token" });
        }
        // si vino el token necesito decodificarlo
        const decoded = verifyToken(token);
        // busco el usuario con el token
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(401).json({ ok: false, message: "Usuario no encontrado" });
        }
        // guardarlo dentro del objeto req
        req.user = user;
        // que pase al siguiente controlador
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ ok: false, message: "Token invalido o expirado" });
    }
};