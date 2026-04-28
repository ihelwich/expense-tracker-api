import { getById as getAccountById } from '../repositories/accountRepo.js';
import { getById as getCategoryById } from '../repositories/categoryRepo.js';
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/transactionRepo.js';

function authorizeRelatedResource(resource, user, resourceName) {
  if (!resource) {
    const error = new Error(`${resourceName} not found`);
    error.status = 404;
    throw error;
  }

  if (user.role !== 'ADMIN' && resource.userId !== user.id) {
    const error = new Error('User is not authorized to access this resource');
    error.status = 403;
    throw error;
  }
}

async function validateAccountAndCategory({ accountId, categoryId, authenticatedUser }) {
  if (accountId !== undefined) {
    const account = await getAccountById(accountId);
    authorizeRelatedResource(account, authenticatedUser, `Account ${accountId}`);
  }

  if (categoryId !== undefined) {
    const category = await getCategoryById(categoryId);
    authorizeRelatedResource(category, authenticatedUser, `Category ${categoryId}`);
  }
}

export async function getAllTransactions(user) {
  return getAll(user);
}

export async function getTransactionById(id) {
  const transaction = await getById(id);
  if (transaction) return transaction;

  const error = new Error(`Transaction ${id} not found`);
  error.status = 404;
  throw error;
}

export async function createTransaction(transactionData) {
  await validateAccountAndCategory(transactionData);

  const data = { ...transactionData };
  delete data.authenticatedUser;

  return create(data);
}

export async function updateTransaction(id, updatedData) {
  await validateAccountAndCategory(updatedData);

  const data = { ...updatedData };
  delete data.authenticatedUser;

  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });

  const updatedTransaction = await update(id, data);
  if (updatedTransaction) return updatedTransaction;

  const error = new Error(`Transaction ${id} not found`);
  error.status = 404;
  throw error;
}

export async function deleteTransaction(id) {
  const result = await remove(id);
  if (result) return;

  const error = new Error(`Transaction ${id} not found`);
  error.status = 404;
  throw error;
}
