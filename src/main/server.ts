import server from '@/main/config/app';

const PORT = Number(process.env.PORT ?? 3030);

server.listen({ port: PORT });
