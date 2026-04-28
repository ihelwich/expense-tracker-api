import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/userService.js';

export async function getAllUsersHandler(req, res) {
  const users = await getAllUsers();
  res.status(200).json(users);
}

export async function getUserByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);
  res.status(200).json(user);
}

export async function updateUserHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, email, password, role } = req.body;

  const updatedUser = await updateUser(id, {
    name,
    email,
    password,
    role,
    authenticatedUser: req.user,
  });

  res.status(200).json(updatedUser);
}

export async function deleteUserHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteUser(id);
  res.status(204).send();
}
