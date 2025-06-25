import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A simple Express API with TypeScript",
    },
  },
  apis: ["./src/routes/*.ts", "./src/docs/*.yaml"],
};

const specs = swaggerJsdoc(options);

export default specs;
