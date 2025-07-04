import express from 'express';
import Map from '../models/Map.js';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const newMap = new Map(req.body);
    await newMap.save();
    res.status(201).json({ message: 'Mapa salvo com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao salvar mapa', details: err.message });
  }
});

export default router;
