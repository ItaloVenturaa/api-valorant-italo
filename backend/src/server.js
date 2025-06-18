import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import conectaNaDatabase from './config/db.js';

dotenv.config();         
conectaNaDatabase();       

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
