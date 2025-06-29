// src/routes/register.js
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  const { username, password, isAdmin = false } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios' });
  }

  if (password.length < 4) {
    return res.status(400).json({ error: 'A senha deve ter pelo menos 4 caracteres.' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já existe' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash, isAdmin });

    await newUser.save();
    res.status(201).json({ message: 'Usuário criado com sucesso' });
    console.log(`[REGISTRO] Usuário "${username}" criado (admin: ${isAdmin}).`);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
