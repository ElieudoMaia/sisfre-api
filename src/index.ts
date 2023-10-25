import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: 'bba8bcae-f137-443a-a836-fbcfbdbe6104',
      name: 'Teste',
      email: 'teste@mail.com',
      createdAt: new Date()
    }
  });

  const users = await prisma.user.findMany();
  console.dir(users, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
