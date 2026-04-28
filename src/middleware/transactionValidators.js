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

export const validateCreateTransaction = [
  body('accountId')
    .exists({ values: 'falsy' })
    .withMessage('Account ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Account ID must be a positive integer'),

  body('categoryId')
    .exists({ values: 'falsy' })
    .withMessage('Category ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer'),

  body('amount')
    .exists({ values: 'null' })
    .withMessage('Amount is required')
    .bail()
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number'),

  body('description')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Description is required')
    .bail()
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .isLength({ min: 2, max: 255 })
    .withMessage('Description must be between 2 and 255 characters')
    .escape(),

  body('transactionDate')
    .exists({ values: 'falsy' })
    .withMessage('Transaction date is required')
    .bail()
    .isISO8601()
    .withMessage('Transaction date must be a valid date'),

  handleValidationErrors,
];

export const validateUpdateTransaction = [
  oneOf(
    [
      body('accountId').exists({ values: 'falsy' }),
      body('categoryId').exists({ values: 'falsy' }),
      body('amount').exists({ values: 'null' }),
      body('description').exists({ values: 'falsy' }),
      body('transactionDate').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one field (accountId, categoryId, amount, description, transactionDate) must be provided',
    },
  ),

  body('accountId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Account ID must be a positive integer'),

  body('categoryId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer'),

  body('amount')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number'),

  body('description')
    .optional()
    .trim()
    .isString()
    .withMessage('Description must be a string')
    .bail()
    .isLength({ min: 2, max: 255 })
    .withMessage('Description must be between 2 and 255 characters')
    .escape(),

  body('transactionDate')
    .optional()
    .isISO8601()
    .withMessage('Transaction date must be a valid date'),

  handleValidationErrors,
];
