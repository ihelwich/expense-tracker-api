import { getTransactionById } from '../services/transactionService.js';

export async function authorizeTransactionOwnership(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const transaction = await getTransactionById(id);

    if (req.user.role !== 'ADMIN' && transaction.userId !== req.user.id) {
      const error = new Error('Forbidden: insufficient permission.');
      error.status = 403;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
}
