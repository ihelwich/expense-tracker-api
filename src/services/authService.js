import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, getById } from '../repositories/userRepo.js';

function removePassword(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function signUp({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  return removePassword(newUser);
}

export async function logIn(email, password) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

  const error = new Error('Invalid credentials');
  error.status = 401;

  const user = await findUserByEmail(email);
  if (!user) throw error;

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw error;

  const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return accessToken;
}

export async function getCurrentUser(id) {
  const user = await getById(id);
  if (user) return user;

  const error = new Error(`User ${id} not found`);
  error.status = 404;
  throw error;
}
