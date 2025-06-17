import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

async function conectaNaDatabase() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STR, options);
    console.log("✅ Conexão com o MongoDB estabelecida com sucesso.");
    return mongoose.connection;
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
    process.exit(1);
  }
}

export default conectaNaDatabase;
