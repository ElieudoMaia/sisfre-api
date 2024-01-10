import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

export const swaggerRoutesDocumentation: FastifyDynamicSwaggerOptions = {
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
        },
        CreateCourse: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  type: {
                    type: 'string',
                    enum: ['GRADUATION', 'INTEGRATED', 'TECHNICAL']
                  },
                  coordinatorId: { type: 'string' },
                  acronym: { type: 'string' },
                  duration: { type: 'number' }
                }
              }
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Sem permissão para realizar operação',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UnauthorizedError'
              }
            }
          }
        },
        ServerError: {
          description: 'Erro interno no servidor',
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
        Course: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            type: {
              type: 'string',
              enum: ['GRADUATION', 'INTEGRATED', 'TECHNICAL']
            },
            coordinatorId: { type: 'string' },
            acronym: { type: 'string' },
            duration: { type: 'number' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
        },
        UnauthorizedError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              enum: [
                'Unauthorized: missing token',
                'Unauthorized: invalid token',
                'Unauthorized: user not allowed'
              ]
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
          tags: ['Usuário'],
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
              description: 'Erro interno no servidor',
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
          tags: ['Usuário'],
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
              description: 'Erro interno no servidor',
              $ref: '#/components/responses/ServerError'
            },
            401: {
              description: 'Unauthorized',
              $ref: '#/components/responses/UnauthorizedError'
            }
          }
        }
      },
      '/courses': {
        post: {
          tags: ['Curso'],
          summary: 'Criar um novo curso',
          description:
            'Criar um novo curso para o sistema. Apenas usuários com permissão de administrador podem realizar esta operação',
          operationId: 'createCourse',
          requestBody: {
            $ref: '#/components/requestBodies/CreateCourse'
          },
          responses: {
            200: {
              description: 'Curso criado com sucesso',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemas/Course'
                  }
                }
              }
            },
            500: {
              description: 'Erro interno no servidor',
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
    tags: [{ name: 'Usuário' }, { name: 'Curso' }]
  }
};
