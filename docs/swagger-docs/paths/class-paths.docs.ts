/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  '/classes': {
    get: {
      tags: ['Turma'],
      summary: 'Buscar turmas',
      description: 'Buscar as turmas cadastrados no sistema',
      operationId: 'listClasses',
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
          description: 'Dados buscados com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  classes: {
                    $ref: '#/components/schemas/ClassWithCourseAndSemester'
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
          description: 'Não autorizado',
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    },
    post: {
      tags: ['Turma'],
      summary: 'Criar um nova turma',
      description: 'Criar um nova turma para o sistema.',
      operationId: 'createClass',
      requestBody: {
        $ref: '#/components/requestBodies/CreateClass'
      },
      responses: {
        200: {
          description: 'Turma criada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Class'
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
          description: 'Não autorizado',
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    }
  },
  '/classes/{id}': {
    get: {
      tags: ['Turma'],
      summary: 'Buscar turma pelo ID',
      description: 'Buscar uma turma cadastrada no sistema',
      operationId: 'getClass',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID da turma',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ClassWithCourseAndSemester'
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
        },
        404: {
          description: 'Não encontrado',
          $ref: '#/components/responses/NotFoundError'
        }
      }
    },
    put: {
      tags: ['Turma'],
      summary: 'Atualizar turma',
      description: 'Atualizar informações da turma',
      operationId: 'updateClass',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do Turma',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        $ref: '#/components/requestBodies/Class'
      },
      responses: {
        200: {
          description: 'Turma atualizada com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Class'
              }
            }
          }
        },
        400: {
          description: 'Não autorizado',
          $ref: '#/components/responses/BadRequestError'
        },
        500: {
          description: 'Erro interno no servidor',
          $ref: '#/components/responses/ServerError'
        },
        401: {
          description: 'Unauthorized',
          $ref: '#/components/responses/UnauthorizedError'
        },
        404: {
          description: 'Não encontrado',
          $ref: '#/components/responses/NotFoundError'
        }
      }
    },
    delete: {
      tags: ['Turma'],
      summary: 'Deletar turma',
      description: 'Deletar uma turma cadastrada no sistema',
      operationId: 'deleteClass',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do Turma',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Turma deletado com sucesso'
        },
        500: {
          description: 'Erro interno no servidor',
          $ref: '#/components/responses/ServerError'
        },
        400: {
          description: 'Não autorizado',
          $ref: '#/components/responses/BadRequestError'
        },
        401: {
          description: 'Não autorizado',
          $ref: '#/components/responses/UnauthorizedError'
        },
        404: {
          description: 'Não encontrado',
          $ref: '#/components/responses/NotFoundError'
        }
      }
    }
  }
} as any;
