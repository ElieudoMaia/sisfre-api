/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  '/login': {
    post: {
      security: [],
      tags: ['Login'],
      summary: 'Login na aplicação',
      description: 'Entre com as credenciais para receber um token de acesso',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                password: { type: 'string' }
              },
              required: ['email', 'password']
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Logado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  accessToken: { type: 'string' }
                }
              }
            }
          }
        },
        '400': {
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
                  message: {
                    type: 'string',
                    enum: ['User not found', 'Password incorrect']
                  }
                }
              }
            }
          }
        },
        '500': {
          description: 'Erro interno no servidor',
          $ref: '#/components/responses/ServerError'
        }
      }
    }
  }
} as any;
