import {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from '../services/accountService.js';

export async function getAllAccountsHandler(req, res) {
  const accounts = await getAllAccounts(req.user);
  res.status(200).json(accounts);
}

export async function getAccountByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const account = await getAccountById(id);
  res.status(200).json(account);
}

export async function createAccountHandler(req, res) {
  const { name, type, startingAmount } = req.body;

  const newAccount = await createAccount({
    name,
    type,
    startingAmount,
    userId: req.user.id,
  });

  res.status(201).json(newAccount);
}

export async function updateAccountHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, type, startingAmount } = req.body;

  const updatedAccount = await updateAccount(id, {
    name,
    type,
    startingAmount,
  });

  res.status(200).json(updatedAccount);
}

export async function deleteAccountHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteAccount(id);
  res.status(204).send();
}
