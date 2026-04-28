import express from 'express';
import {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/userController.js';

import { validateId, validateUpdateUser } from '../middleware/userValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { authorizeSelfOrAdmin } from '../middleware/authorizeSelfOrAdmin.js';

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, getAllUsersHandler);
router.get('/:id', authenticate, validateId, authorizeSelfOrAdmin, getUserByIdHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  authorizeSelfOrAdmin,
  validateUpdateUser,
  updateUserHandler,
);
router.delete(
  '/:id',
  authenticate,
  validateId,
  authorizeSelfOrAdmin,
  deleteUserHandler,
);

export default router;
