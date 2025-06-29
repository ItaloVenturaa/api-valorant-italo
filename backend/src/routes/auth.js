import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config(); 

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'segredo-padrao-inseguro';


router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log(`[LOGIN FALHOU] Usuário "${username}" não encontrado.`);
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      console.log(`[LOGIN FALHOU] Senha incorreta para o usuário "${username}".`);
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
      //{ expiresIn: '5s' }
    );

    res.json({ token });
    console.log(`[LOGIN] Usuário "${username}" autenticado com sucesso.`);
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
