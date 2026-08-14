import mongoose from "mongoose";
import dns from "dns"; //uso esta config de dns porque no me conecta a la base de datos

dns.setServers(["1.1.1.1", "1.0.0.1"]);

const MONGO_URI = process.env.MONGO_URI

export const dbConnect = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🟢 database connected")
    } catch (error) {
        console.error("❌ Error to connect", error)
    }
};