import mongoose from 'mongoose';
import dotenv from 'dotenv';
import conectaNaDatabase from '../src/config/db.js';
import User from '../src/models/User.js';

dotenv.config();

async function clearUsers() {
  await conectaNaDatabase();
  await User.deleteMany({});
  console.log('Todos os usuários foram removidos');
  mongoose.disconnect();
}

clearUsers();
