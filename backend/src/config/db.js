// src/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../logger.js"; 

dotenv.config();

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

async function conectaNaDatabase() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STR, options);
    logger.info("✅ Conexão com o MongoDB estabelecida com sucesso.");
    return mongoose.connection;
  } catch (err) {
    logger.error(`❌ Erro ao conectar ao MongoDB: ${err.message}`);
    process.exit(1);
  }
}

export default conectaNaDatabase;
