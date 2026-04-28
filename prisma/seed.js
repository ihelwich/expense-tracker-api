import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  await prisma.$queryRaw`
    TRUNCATE transactions, categories, accounts, users RESTART IDENTITY CASCADE;
  `;

  const usersData = [
    {
      name: 'Alice Johnson',
      email: 'alice@test.com',
      password: 'alice1234',
      role: 'USER',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: 'bob1234',
      role: 'USER',
    },
    {
      name: 'Charlie Admin',
      email: 'charlie@demo.com',
      password: 'charlie1234',
      role: 'ADMIN',
    },
  ];

  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
      },
    });

    users.push(user);
  }

  for (const user of users) {
    const checkingAccount = await prisma.account.create({
      data: {
        userId: user.id,
        name: 'Checking Account',
        type: 'CHECKING',
        startingAmount: 500.0,
      },
    });

    const savingsAccount = await prisma.account.create({
      data: {
        userId: user.id,
        name: 'Savings Account',
        type: 'SAVINGS',
        startingAmount: 1000.0,
      },
    });

    const groceriesCategory = await prisma.category.create({
      data: {
        userId: user.id,
        name: 'Groceries',
        type: 'EXPENSE',
      },
    });

    const paycheckCategory = await prisma.category.create({
      data: {
        userId: user.id,
        name: 'Paycheck',
        type: 'INCOME',
      },
    });

    await prisma.transaction.createMany({
      data: [
        {
          userId: user.id,
          accountId: checkingAccount.id,
          categoryId: groceriesCategory.id,
          amount: 45.2,
          description: 'Groceries',
          transactionDate: new Date('2026-04-25'),
        },
        {
          userId: user.id,
          accountId: savingsAccount.id,
          categoryId: paycheckCategory.id,
          amount: 1200.0,
          description: 'Paycheck deposit',
          transactionDate: new Date('2026-04-26'),
        },
      ],
    });
  }

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}