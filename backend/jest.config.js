/** @type {import('ts-jest').JestConfigWithTsJest} */

process.env.ENCRYPTION_KEY = '0000000000000000000000000000000000000000000000000000000000000000';
process.env.JWT_SECRET = 'test_secret'; 

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@custom_types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@external/(.*)$': '<rootDir>/src/external/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1'
  },
};