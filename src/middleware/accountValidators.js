import { param, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .escape()
    .isInt({ min: 1 })
    .withMessage('Id must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateAccount = [
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

  body('type')
    .exists({ values: 'falsy' })
    .withMessage('Type is required')
    .bail()
    .isIn(['CHECKING', 'SAVINGS', 'CREDIT_CARD', 'CASH'])
    .withMessage('Type must be CHECKING, SAVINGS, CREDIT_CARD, or CASH'),

  body('startingAmount')
    .exists({ values: 'null' })
    .withMessage('Starting amount is required')
    .bail()
    .isFloat({ min: 0 })
    .withMessage('Starting amount must be a non-negative number'),

  handleValidationErrors,
];

export const validateUpdateAccount = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('type').exists({ values: 'falsy' }),
      body('startingAmount').exists({ values: 'null' }),
    ],
    { message: 'At least one field (name, type, startingAmount) must be provided' },
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

  body('type')
    .optional()
    .isIn(['CHECKING', 'SAVINGS', 'CREDIT_CARD', 'CASH'])
    .withMessage('Type must be CHECKING, SAVINGS, CREDIT_CARD, or CASH'),

  body('startingAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Starting amount must be a non-negative number'),

  handleValidationErrors,
];
