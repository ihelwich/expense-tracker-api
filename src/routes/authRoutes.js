import express from 'express';
import { validateSignUp, validateLogIn } from '../middleware/userValidators.js';
import { signUpHandler, logInHandler, getMeHandler } from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', validateSignUp, signUpHandler);
router.post('/login', validateLogIn, logInHandler);
router.get('/me', authenticate, getMeHandler);

export default router;
