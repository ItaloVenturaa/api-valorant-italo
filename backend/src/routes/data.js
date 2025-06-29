// src/routes/data.js
import express from 'express';
import axios from 'axios';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

const cache = {
  agents: null,
  maps: null,
  lastFetchAgents: 0,
  lastFetchMaps: 0,
};

const CACHE_DURATION = 60 * 1000; // 1 minuto


router.get('/agents', authenticateToken, async (req, res) => {
  const now = Date.now();

  if (cache.agents && (now - cache.lastFetchAgents < CACHE_DURATION)) {
    console.log('[CACHE] Agentes retornados do cache');
    return res.json(cache.agents);
  }

  try {
    const response = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
    cache.agents = response.data.data;
    cache.lastFetchAgents = now;

    console.log(`[BUSCA] Usuário "${req.user.username}" buscou por agente (via API).`);
    res.json(cache.agents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar agentes.' });
  }
});


router.get('/maps', authenticateToken, authorizeAdmin, async (req, res) => {
  const now = Date.now();

  if (cache.maps && (now - cache.lastFetchMaps < CACHE_DURATION)) {
    console.log('[CACHE] Mapas retornados do cache');
    return res.json(cache.maps);
  }

  try {
    const response = await axios.get('https://valorant-api.com/v1/maps');
    cache.maps = response.data.data;
    cache.lastFetchMaps = now;

    console.log(`[BUSCA ADMIN] Usuário ADMIN "${req.user.username}" buscou por mapa (via API).`);
    res.json(cache.maps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar mapas.' });
  }
});


export default router;
