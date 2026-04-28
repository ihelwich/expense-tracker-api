import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/accountRepo.js';

export async function getAllAccounts(user) {
  return getAll(user);
}

export async function getAccountById(id) {
  const account = await getById(id);
  if (account) return account;

  const error = new Error(`Account ${id} not found`);
  error.status = 404;
  throw error;
}

export async function createAccount(accountData) {
  return create(accountData);
}

export async function updateAccount(id, updatedData) {
  Object.keys(updatedData).forEach((key) => {
    if (updatedData[key] === undefined) delete updatedData[key];
  });

  const updatedAccount = await update(id, updatedData);
  if (updatedAccount) return updatedAccount;

  const error = new Error(`Account ${id} not found`);
  error.status = 404;
  throw error;
}

export async function deleteAccount(id) {
  const result = await remove(id);
  if (result) return;

  const error = new Error(`Account ${id} not found`);
  error.status = 404;
  throw error;
}
