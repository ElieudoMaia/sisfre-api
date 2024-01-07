import cors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.factory';
import setupRoutes from './routes';

const app = fastify({ logger: true });

const AuthMiddleware = makeAuthMiddleware();

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

app.register(fastifySwagger, {
  mode: 'dynamic',
  openapi: {
    info: {
      title: 'SisFre API',
      version: '1.0.0',
      contact: {
        name: 'SisFre API',
        email: 'elieudo.maia@gmail.com',
        url: 'https:sisfre.ifce.edu.br'
      },
      description:
        'API para o sistema de gerenciamento de frequencia do IFCE Campus Cedro'
    },
    servers: [{ url: 'http://localhost:3030' }],
    components: {
      requestBodies: {
        User: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UnauthorizedError'
              }
            }
          }
        },
        ServerError: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServerError'
              }
            }
          }
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            nameAbbreviation: { type: 'string' },
            email: { type: 'string' },
            isActive: { type: 'boolean' },
            role: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
        },
        UnauthorizedError: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'number'
            },
            error: {
              type: 'string'
            },
            message: {
              type: 'string'
            }
          }
        },
        ServerError: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'number'
            },
            error: {
              type: 'string'
            },
            message: {
              type: 'string'
            }
          }
        }
      }
    },
    paths: {
      '/users': {
        get: {
          tags: ['Users'],
          summary: 'Buscar usuários',
          description: 'Buscar os usuários cadastrados no sistema',
          operationId: 'listUsers',
          parameters: [
            {
              name: 'pageNumber',
              in: 'query',
              description: 'Página a ser exibida',
              required: false,
              schema: {
                type: 'number'
              }
            },
            {
              name: 'pageSize',
              in: 'query',
              description: 'Tamanho da página',
              required: false,
              schema: {
                type: 'number'
              }
            }
          ],
          responses: {
            200: {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      users: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/User'
                        }
                      },
                      quantity: { type: 'number' },
                      pageNumber: { type: 'number' },
                      pageSize: { type: 'number' }
                    }
                  }
                }
              }
            },
            500: {
              description: 'Internal Server Error',
              $ref: '#/components/responses/ServerError'
            },
            401: {
              description: 'Unauthorized',
              $ref: '#/components/responses/UnauthorizedError'
            }
          }
        }
      },
      '/users/{id}': {
        get: {
          tags: ['Users'],
          summary: 'Buscar usuário pelo ID',
          description: 'Buscar um usuário cadastrado no sistema',
          operationId: 'getUser',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID do usuário',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            200: {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            },
            500: {
              description: 'Internal Server Error',
              $ref: '#/components/responses/ServerError'
            },
            401: {
              description: 'Unauthorized',
              $ref: '#/components/responses/UnauthorizedError'
            }
          }
        }
      }
    },
    tags: [{ name: 'Users' }]
  }
});

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
