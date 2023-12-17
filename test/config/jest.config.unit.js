const config = require('./jest.config')

module.exports = {
  ...config,
  setupFilesAfterEnv: [
    '<rootDir>/test/unit/setup/jest.setup.ts'
  ],
}
