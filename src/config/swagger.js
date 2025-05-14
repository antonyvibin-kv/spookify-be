const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Spotify Clone API',
      version: '1.0.0',
      description: 'API documentation for Spotify Clone application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            profilePicture: {
              type: 'string',
            },
            isPremium: {
              type: 'boolean',
            },
          },
        },
        Song: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            title: {
              type: 'string',
            },
            artist: {
              type: 'string',
            },
            album: {
              type: 'string',
            },
            duration: {
              type: 'integer',
            },
            coverImage: {
              type: 'string',
            },
            audioUrl: {
              type: 'string',
            },
            genre: {
              type: 'string',
            },
            releaseDate: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Playlist: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            coverImage: {
              type: 'string',
            },
            isPublic: {
              type: 'boolean',
            },
            userId: {
              type: 'string',
              format: 'uuid',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs; 