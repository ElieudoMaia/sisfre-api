import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import coursePathsDocs from './paths/course-paths.docs';
import loginPathsDocs from './paths/login-paths.docs';
import schoolSaturdayPathsDocs from './paths/school-saturday-paths.docs';
import userPathsDocs from './paths/user-paths.docs';

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
    security: [{ bearerAuth: [] }],
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
        },
        UpdateCourse: {
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
        },
        CreateUser: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  nameAbbreviation: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  passwordConfirmation: { type: 'string' },
                  role: {
                    type: 'string',
                    enum: ['ADMINISTRATOR', 'COORDINATOR', 'TEACHER']
                  }
                }
              }
            }
          }
        },
        UpdateUser: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  nameAbbreviation: { type: 'string' },
                  email: { type: 'string' },
                  role: {
                    type: 'string',
                    enum: ['ADMINISTRATOR', 'COORDINATOR', 'TEACHER']
                  }
                }
              }
            }
          }
        },
        CreateSchoolSaturday: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  date: { type: 'string' },
                  dayOfWeek: {
                    type: 'string',
                    enum: [
                      'MONDAY',
                      'TUESDAY',
                      'WEDNESDAY',
                      'THURSDAY',
                      'FRIDAY'
                    ]
                  }
                }
              }
            }
          }
        },
        UpdateSchoolSaturday: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  date: { type: 'string' },
                  dayOfWeek: {
                    type: 'string',
                    enum: [
                      'MONDAY',
                      'TUESDAY',
                      'WEDNESDAY',
                      'THURSDAY',
                      'FRIDAY'
                    ]
                  }
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
        SchoolSaturday: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            dayOfWeek: {
              type: 'string',
              enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
            },
            date: { type: 'string' },
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
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    paths: {
      ...userPathsDocs,
      ...coursePathsDocs,
      ...schoolSaturdayPathsDocs,
      ...loginPathsDocs
    },
    tags: [
      { name: 'Usuário' },
      { name: 'Curso' },
      { name: 'Sábado Letivo' },
      { name: 'Login' }
    ]
  }
};
