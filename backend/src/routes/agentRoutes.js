import express from 'express';
import Agent from '../models/Agent.js';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    await newAgent.save();
    res.status(201).json({ message: 'Agente salvo com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao salvar agente', details: err.message });
  }
});

export default router;
