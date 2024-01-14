/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
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
    },
    post: {
      tags: ['Usuário'],
      summary: 'Criar um novo usuário',
      description: 'Criar um novo usuário para o sistema.',
      operationId: 'createUser',
      requestBody: {
        $ref: '#/components/requestBodies/CreateUser'
      },
      responses: {
        200: {
          description: 'Usuário criado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  nameAbbreviation: { type: 'string' },
                  email: { type: 'string' },
                  role: { type: 'string' }
                }
              }
            }
          }
        },
        401: {
          description: 'Não autorizado',
          $ref: '#/components/responses/UnauthorizedError'
        },
        400: {
          description: 'Não autorizado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  statusCode: { type: 'number' },
                  error: {
                    type: 'string',
                    enum: ['Bad Request']
                  },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        500: {
          description: 'Erro interno no servidor',
          $ref: '#/components/responses/ServerError'
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
    },
    put: {
      tags: ['Usuário'],
      summary: 'Atualizar usuário',
      description: 'Atualizar dados do usuário.',
      operationId: 'updateUser',
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
      requestBody: {
        $ref: '#/components/requestBodies/UpdateUser'
      },
      responses: {
        200: {
          description: 'Usuário atualizado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  nameAbbreviation: { type: 'string' },
                  email: { type: 'string' },
                  role: { type: 'string' }
                }
              }
            }
          }
        },
        400: {
          description: 'Não autorizado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  statusCode: { type: 'number' },
                  error: {
                    type: 'string',
                    enum: ['Bad Request']
                  },
                  message: { type: 'string' }
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
  }
} as any;
