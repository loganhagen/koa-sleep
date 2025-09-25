import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Koa Sleep API",
      version: "1.0.0",
      description: "API for tracking and retrieving user wellness data.",
    },
    servers: [
      {
        url: `${process.env.BACKEND_URL}/api`,
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "The unique identifier for the user.",
            },
            email: {
              type: "string",
              format: "email",
              description: "The user's email address.",
            },
            firstName: {
              type: "string",
              description: "The user's first name.",
            },
            lastName: {
              type: "string",
              description: "The user's last name.",
            },
          },
        },
        SleepLog: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "The unique identifier for the sleep log.",
            },
            userId: {
              type: "string",
              format: "uuid",
              description: "The unique identifier for the user.",
            },
            dateTime: {
              type: "string",
              format: "date-time",
              description: "The date and time the sleep log was recorded.",
            },
            bedTime: {
              type: "string",
              format: "date-time",
              description: "The time the user went to bed.",
            },
            wakeTime: {
              type: "string",
              format: "date-time",
              description: "The time the user woke up.",
            },
            duration: {
              type: "integer",
              description: "The total duration of the sleep in minutes.",
            },
            efficiency: {
              type: "integer",
              description: "The sleep efficiency score.",
            },
            awakeMins: {
              type: "integer",
              description: "The number of minutes the user was awake.",
            },
            lightMins: {
              type: "integer",
              description: "The number of minutes the user was in light sleep.",
            },
            deepMins: {
              type: "integer",
              description: "The number of minutes the user was in deep sleep.",
            },
            remMins: {
              type: "integer",
              description: "The number of minutes the user was in REM sleep.",
            },
          },
        },
        WellnessSummary: {
          type: "object",
          properties: {
            skinTemperature: {
              type: "string",
            },
            breathingRate: {
              type: "string",
            },
            hrv: {
              type: "string",
            },
            spo2: {
              type: "string",
            },
          },
        },
        CoreMetrics: {
          type: "object",
          properties: {
            bedTime: {
              type: "string",
              format: "date-time",
            },
            wakeTime: {
              type: "string",
              format: "date-time",
            },
            duration: {
              type: "string",
            },
            efficiency: {
              type: "number",
            },
          },
        },
        SleepStages: {
          type: "object",
          properties: {
            awakeMins: {
              type: "number",
            },
            lightMins: {
              type: "number",
            },
            deepMins: {
              type: "number",
            },
            remMins: {
              type: "number",
            },
          },
        },
        Log: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            userId: {
              type: "string",
            },
            dateTime: {
              type: "string",
              format: "date-time",
            },
            bedTime: {
              type: "string",
              format: "date-time",
            },
            wakeTime: {
              type: "string",
              format: "date-time",
            },
            duration: {
              type: "string",
            },
            efficiency: {
              type: "number",
            },
            awakeMins: {
              type: "number",
            },
            lightMins: {
              type: "number",
            },
            deepMins: {
              type: "number",
            },
            remMins: {
              type: "number",
            },
            skinTemperature: {
              type: "number",
              nullable: true,
            },
            breathingRate: {
              type: "number",
              nullable: true,
            },
            hrv: {
              type: "number",
              nullable: true,
            },
            spo2: {
              type: "number",
              nullable: true,
            },
          },
        },
        FullLogs: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Log",
          },
        },
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
