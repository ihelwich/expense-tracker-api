export function authorizeSelfOrAdmin(req, res, next) {
  const id = parseInt(req.params.id);

  if (req.user.role !== 'ADMIN' && req.user.id !== id) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }

  next();
}
