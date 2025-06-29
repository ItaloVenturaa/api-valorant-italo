import express from 'express';
import cors from 'cors';
import compression from 'compression';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import conectaNaDatabase from './config/db.js';
import dataRoutes from './routes/data.js';
import registerRoutes from './routes/register.js';


dotenv.config();         
conectaNaDatabase();       

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/data', dataRoutes);
app.use('/register', registerRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
