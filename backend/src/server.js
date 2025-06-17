import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/auth.js';
import dotenv from 'dotenv';
import conectaNaDatabase from './src/config/db.js';

dotenv.config();            // carregar .env primeiro
conectaNaDatabase();        // agora sim, pode usar process.env

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
