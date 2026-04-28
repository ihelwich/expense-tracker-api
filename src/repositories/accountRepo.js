import prisma from '../config/db.js';

export async function getAll(user) {
  const conditions = {};

  if (user.role !== 'ADMIN') {
    conditions.userId = user.id;
  }

  const accounts = await prisma.account.findMany({
    where: conditions,
    orderBy: { id: 'asc' },
  });

  return accounts;
}

export async function getById(id) {
  const account = await prisma.account.findUnique({ where: { id } });
  return account;
}

export function create(accountData) {
  const newAccount = prisma.account.create({ data: accountData });
  return newAccount;
}

export async function update(id, updatedData) {
  try {
    const updatedAccount = await prisma.account.update({
      where: { id },
      data: updatedData,
    });
    return updatedAccount;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedAccount = await prisma.account.delete({
      where: { id },
    });
    return deletedAccount;
  } catch (error) {
    if (error.code === 'P2025') return null;

    if (
      error.code === 'P2003' ||
      error.code === 'P2014' ||
      error.message.includes('violates RESTRICT setting of foreign key constraint')
    ) {
      const err = new Error(
        'Account cannot be deleted because it has associated transactions',
      );
      err.status = 409;
      throw err;
    }

    throw error;
  }
}