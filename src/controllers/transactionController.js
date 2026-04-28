import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/transactionService.js';

export async function getAllTransactionsHandler(req, res) {
  const transactions = await getAllTransactions(req.user);
  res.status(200).json(transactions);
}

export async function getTransactionByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const transaction = await getTransactionById(id);
  res.status(200).json(transaction);
}

export async function createTransactionHandler(req, res) {
  const { accountId, categoryId, amount, description, transactionDate } = req.body;

  const newTransaction = await createTransaction({
    userId: req.user.id,
    accountId,
    categoryId,
    amount,
    description,
    transactionDate,
    authenticatedUser: req.user,
  });

  res.status(201).json(newTransaction);
}

export async function updateTransactionHandler(req, res) {
  const id = parseInt(req.params.id);
  const { accountId, categoryId, amount, description, transactionDate } = req.body;

  const updatedTransaction = await updateTransaction(id, {
    accountId,
    categoryId,
    amount,
    description,
    transactionDate,
    authenticatedUser: req.user,
  });

  res.status(200).json(updatedTransaction);
}

export async function deleteTransactionHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteTransaction(id);
  res.status(204).send();
}
