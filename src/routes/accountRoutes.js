import express from 'express';
import {
  getAllAccountsHandler,
  getAccountByIdHandler,
  createAccountHandler,
  updateAccountHandler,
  deleteAccountHandler,
} from '../controllers/accountController.js';

import {
  validateId,
  validateCreateAccount,
  validateUpdateAccount,
} from '../middleware/accountValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeAccountOwnership } from '../middleware/authorizeAccountOwnership.js';

const router = express.Router();

router.get('/', authenticate, getAllAccountsHandler);
router.get('/:id', authenticate, validateId, authorizeAccountOwnership, getAccountByIdHandler);
router.post('/', authenticate, validateCreateAccount, createAccountHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  authorizeAccountOwnership,
  validateUpdateAccount,
  updateAccountHandler,
);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeAccountOwnership,
  deleteAccountHandler,
);

export default router;
