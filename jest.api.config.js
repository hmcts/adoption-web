module.exports = {
  roots: ['<rootDir>/src/test/api'],
  testRegex: '(/src/test/.*|\\.api\\.test)\\.(ts|js)$',
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
        pageTitle: 'API test report',
        outputPath: 'output/api-tests.html',
      },
    ],
  ],
};
