// src/routes/data.js
import express from 'express';
import Agent from '../models/Agent.js';
import Map from '../models/Map.js';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Busca todos os agentes do banco
router.get('/agents', authenticateToken, async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
    console.log(`[BUSCA] Usuário "${req.user.username}" buscou por agentes (via MongoDB).`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar agentes.' });
  }
});

// Busca todos os mapas do banco (somente admin)
router.get('/maps', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const maps = await Map.find();
    res.json(maps);
    console.log(`[BUSCA ADMIN] Usuário ADMIN "${req.user.username}" buscou por mapas (via MongoDB).`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar mapas.' });
  }
});

export default router;
