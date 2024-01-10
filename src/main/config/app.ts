import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';
import { swaggerRoutesDocumentation } from '../../../docs/swagger-docs';
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.factory';
import setupRoutes from './routes';

const app = fastify({ logger: true });

const AuthMiddleware = makeAuthMiddleware();

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

app.register(fastifySwagger, swaggerRoutesDocumentation);

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
    displayRequestDuration: true,
    layout: 'BaseLayout'
  }
});

app.addHook('preHandler', AuthMiddleware.handle.bind(AuthMiddleware));

app.get('/health', async () => ({
  service: 'SisFre API',
  status: 'Service UP',
  date: new Date()
}));

setupRoutes(app);

export default app;
