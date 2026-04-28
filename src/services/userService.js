import bcrypt from 'bcrypt';
import {
  getAll,
  getById,
  update,
  remove,
} from '../repositories/userRepo.js';

export async function getAllUsers() {
  return getAll();
}

export async function getUserById(id) {
  const user = await getById(id);
  if (user) return user;

  const error = new Error(`User ${id} not found`);
  error.status = 404;
  throw error;
}

export async function updateUser(id, updatedData) {
  const data = { ...updatedData };
  const authenticatedUser = data.authenticatedUser;
  delete data.authenticatedUser;

  if (authenticatedUser.role !== 'ADMIN') {
    delete data.role;
  }

  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const updatedUser = await update(id, data);
  if (updatedUser) return updatedUser;

  const error = new Error(`User ${id} not found`);
  error.status = 404;
  throw error;
}

export async function deleteUser(id) {
  const result = await remove(id);
  if (result) return;

  const error = new Error(`User ${id} not found`);
  error.status = 404;
  throw error;
}
