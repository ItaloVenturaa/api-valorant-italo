// src/routes/data.js
import express from 'express';
import axios from 'axios';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/agents', authenticateToken, async (req, res) => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
    res.json(response.data.data);
    console.log(`[BUSCA] Usuário "${req.user.username}" buscou por agente.`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar agentes.' });
  }
});

router.get('/maps', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/maps');
    res.json(response.data.data);
    console.log(`[BUSCA ADMIN] Usuário ADMIN "${req.user.username}" buscou por mapa.`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar mapas.' });
  }
});

export default router;
