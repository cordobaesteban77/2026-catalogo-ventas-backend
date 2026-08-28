import nodemailer from "nodemailer";

// primer paso es configurar el transporter
export const createTansporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
};

// armar la funcion que envia el email
export const sendVerificationEmail = async (email, username, verificationCode) => {
    const transporter = createTansporter();
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subjet: "Verifica tu email en nuestra aplicación",
        html: `
            <h2>Bienvenido ${username} a nuestro Ecommerce!</h2>
            <p>Tu código de verificación es:</p>
            <h1 style="font-size: 32px; letter-spacing: 5px; color: #4CAF50; margin: 20px 0;">${verificationCode}</h1> 
            <p>Si no creaste una cuenta en nuestra app ignora este email.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error("Error al enviar el email", error.message);
    }
};