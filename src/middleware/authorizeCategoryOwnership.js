import { getCategoryById } from '../services/categoryService.js';

export async function authorizeCategoryOwnership(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const category = await getCategoryById(id);

    if (req.user.role !== 'ADMIN' && category.userId !== req.user.id) {
      const error = new Error('Forbidden: insufficient permission.');
      error.status = 403;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
}
