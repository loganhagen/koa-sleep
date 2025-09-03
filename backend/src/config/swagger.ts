import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FitSync API",
      version: "1.0.0",
      description: "API for tracking and retrieving user wellness data.",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
    components: {
      schemas: {
        Error: {
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
