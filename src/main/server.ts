import server from '@/main/config/app';
import { PrismaClient } from '@prisma/client';

const PORT = Number(process.env.PORT ?? 3030);

new PrismaClient()
  .$connect()
  .then(() => server.listen({ port: PORT, host: '0.0.0.0' }))
  .catch((error) => {
    server.log.error(error);
    process.exit(1);
  });
