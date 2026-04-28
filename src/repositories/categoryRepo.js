import prisma from '../config/db.js';

export async function getAll(user) {
  const conditions = {};

  if (user.role !== 'ADMIN') {
    conditions.userId = user.id;
  }

  const categories = await prisma.category.findMany({
    where: conditions,
    orderBy: { id: 'asc' },
  });

  return categories;
}

export async function getById(id) {
  const category = await prisma.category.findUnique({ where: { id } });
  return category;
}

export async function create(categoryData) {
  try {
    const newCategory = await prisma.category.create({ data: categoryData });
    return newCategory;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Category name already exists for this user');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function update(id, updatedData) {
  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: updatedData,
    });
    return updatedCategory;
  } catch (error) {
    if (error.code === 'P2025') return null;
    if (error.code === 'P2002') {
      const err = new Error('Category name already exists for this user');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });
    return deletedCategory;
  } catch (error) {
    if (error.code === 'P2025') return null;

    if (
      error.code === 'P2003' ||
      error.code === 'P2014' ||
      error.message.includes('violates RESTRICT setting of foreign key constraint')
    ) {
      const err = new Error(
        'Category cannot be deleted because it has associated transactions',
      );
      err.status = 409;
      throw err;
    }

    throw error;
  }
}
