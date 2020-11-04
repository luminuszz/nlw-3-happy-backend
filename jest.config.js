/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],

};
