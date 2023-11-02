import fastify from 'fastify';
import setupRoutes from './routes';

import cors from '@fastify/cors';

const app = fastify({ logger: true });

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

app.get('/health', async () => ({
  service: 'SisFre API',
  status: 'Service UP',
  date: new Date()
}));

setupRoutes(app);

export default app;
