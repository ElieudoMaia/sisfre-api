/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  '/courses': {
    get: {
      tags: ['Curso'],
      summary: 'Buscar cursos',
      description: 'Buscar os cursos cadastrados no sistema',
      operationId: 'listCourses',
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
          description: 'Sucesso ao buscar cursos',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  courses: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        type: {
                          type: 'string',
                          enum: ['GRADUATION', 'INTEGRATED', 'TECHNICAL']
                        },
                        acronym: { type: 'string' },
                        duration: { type: 'number' },
                        coordinator: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            email: { type: 'string' }
                          }
                        }
                      }
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
  },
  '/courses/{id}': {
    get: {
      tags: ['Curso'],
      summary: 'Buscar curso pelo ID',
      description: 'Buscar um curso cadastrado no sistema',
      operationId: 'getCourse',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do curso',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  type: {
                    type: 'string',
                    enum: ['GRADUATION', 'INTEGRATED', 'TECHNICAL']
                  },
                  coordinator: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' }
                    }
                  },
                  acronym: { type: 'string' },
                  duration: { type: 'number' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' }
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
    put: {
      tags: ['Curso'],
      summary: 'Atualizar curso',
      description:
        'Atualizar dados do curso. Apenas usuários com permissão de administrador podem realizar esta operação',
      operationId: 'updateCourse',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do curso',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateCourse'
      },
      responses: {
        200: {
          description: 'Curso atualizado com sucesso',
          content: {
            'application/json': {
              schema: {
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
                  duration: { type: 'number' }
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
