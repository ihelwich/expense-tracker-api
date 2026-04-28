import express from 'express';
import {
  getAllTransactionsHandler,
  getTransactionByIdHandler,
  createTransactionHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
} from '../controllers/transactionController.js';

import {
  validateId,
  validateCreateTransaction,
  validateUpdateTransaction,
} from '../middleware/transactionValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeTransactionOwnership } from '../middleware/authorizeTransactionOwnership.js';

const router = express.Router();

router.get('/', authenticate, getAllTransactionsHandler);
router.get(
  '/:id',
  authenticate,
  validateId,
  authorizeTransactionOwnership,
  getTransactionByIdHandler,
);
router.post('/', authenticate, validateCreateTransaction, createTransactionHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  authorizeTransactionOwnership,
  validateUpdateTransaction,
  updateTransactionHandler,
);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeTransactionOwnership,
  deleteTransactionHandler,
);

export default router;
