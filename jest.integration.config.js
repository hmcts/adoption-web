module.exports = {
  roots: ['<rootDir>/src/main'],
  testRegex: '(/src/test/.*|\\.integration\\.test)\\.(ts|js)$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: ['jest-extended'],
  moduleNameMapper: {
    '@hmcts/nodejs-logging': '<rootDir>/src/test/unit/mocks/hmcts/nodejs-logging',
  },
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Integration test report',
        outputPath: 'output/integration-tests.html',
      },
    ],
  ],
};
