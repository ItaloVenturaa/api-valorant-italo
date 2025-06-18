import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import conectaNaDatabase from '../src/config/db.js';
import User from '../src/models/User.js';

dotenv.config();

async function seedUsers() {
  await conectaNaDatabase();

  const users = [
    {
      username: 'admin',
      password: 'admin123',
      isAdmin: true,
    },
    {
      username: 'user',
      password: 'user123',
      isAdmin: false,
    },
  ];

  for (const user of users) {
    const existing = await User.findOne({ username: user.username });
    if (existing) {
      console.log(`Usuário "${user.username}" já existe, pulando...`);
      continue;
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    await User.create({ username: user.username, passwordHash, isAdmin: user.isAdmin });
    console.log(`Usuário "${user.username}" criado com sucesso.`);
  }

  mongoose.disconnect();
}

seedUsers();
