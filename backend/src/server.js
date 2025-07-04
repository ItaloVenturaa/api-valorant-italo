// OBS: Este projeto utiliza HTTP em ambiente local por simplicidade de configuração.
// Em produção, recomenda-se fortemente o uso de HTTPS para garantir a segurança das requisições.
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';
import conectaNaDatabase from './config/db.js';
import dataRoutes from './routes/data.js';
import registerRoutes from './routes/register.js';
import agentRoutes from './routes/agentRoutes.js';
import mapRoutes from './routes/mapRoutes.js';
import importRoutes from './routes/import.js';
import { logger } from "../logger.js";

dotenv.config();         
conectaNaDatabase();       

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/data', dataRoutes);
app.use('/register', registerRoutes);
app.use('/agents', agentRoutes);
app.use('/maps', mapRoutes);
app.use('/import', importRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
