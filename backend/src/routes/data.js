import express from 'express';
import axios from 'axios';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Agentes: todos logados podem acessar
router.get('/agents', authenticateToken, async (req, res) => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
    res.json(response.data.data);
  } catch (err) {
    console.error('Erro ao buscar agentes:', err.message);
    res.status(500).json({ error: 'Erro ao buscar agentes' });
  }
});

// Mapas: apenas admin
router.get('/maps', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/maps');
    res.json(response.data.data);
  } catch (err) {
    console.error('Erro ao buscar mapas:', err.message);
    res.status(500).json({ error: 'Erro ao buscar mapas' });
  }
});

export default router;
