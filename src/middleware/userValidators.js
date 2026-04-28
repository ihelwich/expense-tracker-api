import { body, param, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validateSignUp = [
  body('name')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),

  body('email')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is not valid')
    .bail()
    .normalizeEmail(),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'Password must contain at least 8 characters and at most 64 characters',
    ),

  body('role')
    .optional()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be either USER or ADMIN'),

  handleValidationErrors,
];

export const validateLogIn = [
  body('email')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .normalizeEmail(),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required'),

  handleValidationErrors,
];

export const validateUpdateUser = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('email').exists({ values: 'falsy' }),
      body('password').exists({ values: 'falsy' }),
      body('role').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (name, email, password, role) must be provided' },
  ),

  body('name')
    .optional()
    .trim()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Email is not valid')
    .bail()
    .normalizeEmail(),

  body('password')
    .optional()
    .isLength({ min: 8, max: 64 })
    .withMessage(
      'Password must contain at least 8 characters and at most 64 characters',
    ),

  body('role')
    .optional()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be either USER or ADMIN'),

  handleValidationErrors,
];
