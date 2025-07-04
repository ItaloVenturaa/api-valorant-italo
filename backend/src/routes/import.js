import express from 'express';
import axios from 'axios';
import Agent from '../models/Agent.js';
import Map from '../models/Map.js';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    // Verifica se já existem agentes e mapas
    const existingAgents = await Agent.countDocuments();
    const existingMaps = await Map.countDocuments();

    if (existingAgents > 0 || existingMaps > 0) {
      return res.status(200).json({ message: 'Já importado' });
    }

    // Importa agentes
    const agentRes = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
    const agents = agentRes.data.data;
    await Agent.insertMany(agents);

    // Importa mapas
    const mapRes = await axios.get('https://valorant-api.com/v1/maps');
    const maps = mapRes.data.data;
    await Map.insertMany(maps);

    res.json({ message: 'Importação concluída', agents: agents.length, maps: maps.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao importar dados.' });
  }
});

export default router;
