// src/routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import { loginLimiter } from '../middleware/rateLimiter.js';
import { logger } from '../logger.js';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'segredo-padrao-inseguro';

router.post(
  '/',
  loginLimiter,
  [
    body('username').trim().notEmpty().withMessage('Usuário é obrigatório'),
    body('password').trim().isLength({ min: 4 }).withMessage('Senha deve ter no mínimo 4 caracteres'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        logger.warn(`[LOGIN FALHOU] Usuário "${username}" não encontrado.`);
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        logger.warn(`[LOGIN FALHOU] Senha incorreta para o usuário "${username}".`);
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
        },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION || '1h' }
      );

      logger.info(`[LOGIN] Usuário "${username}" autenticado com sucesso.`);
      res.json({ token });
    } catch (err) {
      logger.error('Erro no login:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);

export default router;
