/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  '/school-saturdays': {
    get: {
      tags: ['Sábado Letivo'],
      summary: 'Buscar sábados letivos',
      description: 'Buscar os sábados letivos cadastrados no sistema',
      operationId: 'listSchoolSaturdays',
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
                  schoolSaturdays: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      dayOfWeek: {
                        type: 'string',
                        enum: [
                          'MONDAY',
                          'TUESDAY',
                          'WEDNESDAY',
                          'THURSDAY',
                          'FRIDAY'
                        ]
                      },
                      date: { type: 'string' },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' }
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
          description: 'Não autorizado',
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    },
    post: {
      tags: ['Sábado Letivo'],
      summary: 'Criar um novo sábado letivo',
      description: 'Criar um novo sábado letivo para o sistema.',
      operationId: 'createSchoolSaturday',
      requestBody: {
        $ref: '#/components/requestBodies/CreateSchoolSaturday'
      },
      responses: {
        200: {
          description: 'Sábado letivo criado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/SchoolSaturday'
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
  '/school-saturdays/{id}': {
    get: {
      tags: ['Sábado Letivo'],
      summary: 'Buscar sábado letivo pelo ID',
      description: 'Buscar um sábado letivo cadastrado no sistema',
      operationId: 'getSchoolSaturday',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do sábado letivo',
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
                $ref: '#/components/schemas/SchoolSaturday'
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
      tags: ['Sábado Letivo'],
      summary: 'Atualizar sábado letivo',
      description: 'Atualizar informações do sábado letivo.',
      operationId: 'updateSchoolSaturday',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do sábado letivo',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateSchoolSaturday'
      },
      responses: {
        200: {
          description: 'Sábado letivo atualizado com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SchoolSaturday'
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
