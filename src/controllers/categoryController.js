import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService.js';

export async function getAllCategoriesHandler(req, res) {
  const categories = await getAllCategories(req.user);
  res.status(200).json(categories);
}

export async function getCategoryByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const category = await getCategoryById(id);
  res.status(200).json(category);
}

export async function createCategoryHandler(req, res) {
  const { name, type } = req.body;

  const newCategory = await createCategory({
    name,
    type,
    userId: req.user.id,
  });

  res.status(201).json(newCategory);
}

export async function updateCategoryHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, type } = req.body;

  const updatedCategory = await updateCategory(id, {
    name,
    type,
  });

  res.status(200).json(updatedCategory);
}

export async function deleteCategoryHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteCategory(id);
  res.status(204).send();
}
