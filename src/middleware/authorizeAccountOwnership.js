import { getAccountById } from '../services/accountService.js';

export async function authorizeAccountOwnership(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const account = await getAccountById(id);

    if (req.user.role !== 'ADMIN' && account.userId !== req.user.id) {
      const error = new Error('Forbidden: insufficient permission.');
      error.status = 403;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
}
