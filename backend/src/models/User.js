import { openDb } from '../config/db.js';
import bcrypt from 'bcrypt';

export async function findUserByUsername(username) {
  const db = await openDb();
  return db.get('SELECT * FROM users WHERE username = ?', [username]);
}

export async function createUser(username, password) {
  const db = await openDb();
  const passwordHash = await bcrypt.hash(password, 10);
  return db.run('INSERT INTO users (username, passwordHash) VALUES (?, ?)', [username, passwordHash]);
}
