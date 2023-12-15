
const swaggerUi = require('swagger-ui-express');
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', // Especificação OpenAPI
    info: {
      title: 'Nome da Sua API',
      version: '1.0.0',
      description: 'Descrição da Sua API',
    },
  },
  apis: ['.dist/main/routes/*.js'], // Caminho para os arquivos que contêm as rotas da sua API
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec,
  swaggerUi,
};
