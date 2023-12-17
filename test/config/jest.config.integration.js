const config = require('./jest.config')

module.exports = {
  ...config,
  setupFilesAfterEnv: [
    '<rootDir>/test/integration/setup/jest.setup.ts',
    // '<rootDir>/test/integration/setup/supertest.setup.ts',
    // '<rootDir>/test/integration/setup/polly.setup.ts',
  ],
}
