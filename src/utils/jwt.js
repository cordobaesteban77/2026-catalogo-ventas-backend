// 1 - importar jwt
import jwt from "jsonwebtoken";

// 2 - funcion que me ayude a generar el token
export const generateToken = (userId) => {
    // la funcion me rotrne un token
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '1h' });
};

// 3 - funcion que me sirva para verificar un token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Token inválido o expirado');
    }
};