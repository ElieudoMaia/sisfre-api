/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  '/semesters': {
    get: {
      tags: ['Semestre'],
      summary: 'Buscar semestres',
      description: 'Buscar os semestres cadastrados no sistema',
      operationId: 'listSemesters',
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
                  semesters: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        year: { type: 'number' },
                        semester: {
                          type: 'string',
                          enum: [1, 2]
                        },
                        type: {
                          type: 'string',
                          enum: ['REGULAR', 'CONVENTIONAL']
                        },
                        startFirstStage: { type: 'date' },
                        endFirstStage: { type: 'date' },
                        startSecondStage: { type: 'date' },
                        endSecondStage: { type: 'date' },
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
      tags: ['Semestre'],
      summary: 'Criar um novo semestre',
      description: 'Criar um novo semestre para o sistema.',
      operationId: 'createsemester',
      requestBody: {
        $ref: '#/components/requestBodies/CreateSemester'
      },
      responses: {
        200: {
          description: 'Semestre criado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Semester'
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
  '/semesters/{id}': {
    get: {
      tags: ['Semestre'],
      summary: 'Buscar semestre pelo ID',
      description: 'Buscar um semestre cadastrado no sistema',
      operationId: 'getSemesterById',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do semestre',
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
                $ref: '#/components/schemas/Semester'
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
      tags: ['Semestre'],
      summary: 'Atualizar semestre',
      description: 'Atualizar informações do semestre.',
      operationId: 'updateSchoolSaturday',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do semestre',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        $ref: '#/components/requestBodies/UpdateSemester'
      },
      responses: {
        200: {
          description: 'Semestre atualizado com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Semester'
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
      tags: ['Semestre'],
      summary: 'Deletar semestre',
      description: 'Deletar um semestre cadastrado no sistema',
      operationId: 'deleteSemester',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID do semestre',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        204: {
          description: 'Semestre deletado com sucesso'
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
