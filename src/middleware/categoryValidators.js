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

export const validateCreateCategory = [
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
    .isIn(['INCOME', 'EXPENSE'])
    .withMessage('Type must be INCOME or EXPENSE'),

  handleValidationErrors,
];

export const validateUpdateCategory = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('type').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (name, type) must be provided' },
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
    .isIn(['INCOME', 'EXPENSE'])
    .withMessage('Type must be INCOME or EXPENSE'),

  handleValidationErrors,
];
