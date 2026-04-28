export function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'ADMIN') {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }

  next();
}
