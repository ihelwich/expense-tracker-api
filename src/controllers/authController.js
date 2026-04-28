import { signUp, logIn, getCurrentUser } from '../services/authService.js';

export async function signUpHandler(req, res) {
  const { name, email, password } = req.body;
  const newUser = await signUp({ name, email, password });
  res.status(201).json(newUser);
}

export async function logInHandler(req, res) {
  const { email, password } = req.body;
  const accessToken = await logIn(email, password);
  res.status(200).json({ accessToken });
}

export async function getMeHandler(req, res) {
  const user = await getCurrentUser(req.user.id);
  res.status(200).json(user);
}
