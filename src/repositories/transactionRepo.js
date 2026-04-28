import prisma from '../config/db.js';

export async function getAll(user) {
  const conditions = {};

  if (user.role !== 'ADMIN') {
    conditions.userId = user.id;
  }

  const transactions = await prisma.transaction.findMany({
    where: conditions,
    orderBy: { id: 'asc' },
  });

  return transactions;
}

export async function getById(id) {
  const transaction = await prisma.transaction.findUnique({ where: { id } });
  return transaction;
}

export async function create(transactionData) {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        ...transactionData,
        transactionDate: new Date(transactionData.transactionDate),
      },
    });
    return newTransaction;
  } catch (error) {
    if (error.code === 'P2003') {
      const err = new Error('Account or category does not exist');
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function update(id, updatedData) {
  try {
    const data = { ...updatedData };

    if (data.transactionDate !== undefined) {
      data.transactionDate = new Date(data.transactionDate);
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data,
    });
    return updatedTransaction;
  } catch (error) {
    if (error.code === 'P2025') return null;
    if (error.code === 'P2003') {
      const err = new Error('Account or category does not exist');
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedTransaction = await prisma.transaction.delete({
      where: { id },
    });
    return deletedTransaction;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
