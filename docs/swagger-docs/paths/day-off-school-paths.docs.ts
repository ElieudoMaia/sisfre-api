/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  '/days-off-school': {
    get: {
      tags: ['Dia Não Letivo'],
      summary: 'Buscar dias não letivos',
      description: 'Buscar os dias não letivos cadastrados no sistema',
      operationId: 'listDaysOffSchool',
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
                  daysOffSchool: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        description: { type: 'string' },
                        type: {
                          type: 'string',
                          enum: ['HOLIDAY', 'RECESS', 'VOCATION']
                        },
                        dateBegin: { type: 'string' },
                        dateEnd: { type: 'string', nullable: true },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' }
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
          description: 'Não autorizado',
          $ref: '#/components/responses/UnauthorizedError'
        }
      }
    },
    post: {
      tags: ['Dia Não Letivo'],
      summary: 'Criar um novo dia não letivo',
      description: 'Criar um novo dia não letivo para o sistema.',
      operationId: 'createDayOffSchool',
      requestBody: {
        $ref: '#/components/requestBodies/CreateDayOffSchool'
      },
      responses: {
        200: {
          description: 'Dia não letivo criado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/DayOffSchool'
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
  '/days-off-school/{id}': {
    get: {
      tags: ['Dia Não Letivo'],
      summary: 'Buscar dia não letivo pelo ID',
      description: 'Buscar um dia não letivo cadastrado no sistema',
      operationId: 'getDayOffSchoolById',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do dia não letivo',
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
                $ref: '#/components/schemas/DayOffSchool'
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
      tags: ['Dia Não Letivo'],
      summary: 'Atualizar dia não letivo',
      description: 'Atualizar informações do dia não letivo.',
      operationId: 'updateDayOffSchool',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do dia não letivo',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateDayOffSchool'
      },
      responses: {
        200: {
          description: 'Dia não letivo atualizado com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DayOffSchool'
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
        },
        404: {
          description: 'Não encontrado',
          $ref: '#/components/responses/NotFoundError'
        }
      }
    },
    delete: {
      tags: ['Dia Não Letivo'],
      summary: 'Deletar dia não letivo',
      description: 'Deletar um dia não letivo cadastrado no sistema',
      operationId: 'deleteDayOffSchool',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do dia não letivo',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Dia não letivo deletado com sucesso'
        },
        500: {
          description: 'Erro interno no servidor',
          $ref: '#/components/responses/ServerError'
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
