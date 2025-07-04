// src/routes/register.js
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken,authorizeAdmin,
  [
    body('username')
      .trim()
      .notEmpty().withMessage('Nome de usuário é obrigatório'),

    body('password')
      .trim()
      .isLength({ min: 4 }).withMessage('Senha deve ter no mínimo 4 caracteres'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, isAdmin = false } = req.body;

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: 'Usuário já existe' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({ username, passwordHash, isAdmin });

      await newUser.save();
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);

export default router;
