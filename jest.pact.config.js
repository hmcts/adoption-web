module.exports = {
  roots: ['<rootDir>/src/test/pact'],
  testRegex: '(/src/test/pact/*|\\.test)\\.(ts|js)$',
  testEnvironment: 'node',
  // testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  // reporters: [
  //   'default',
  //   [
  //     './node_modules/jest-html-reporter',
  //     {
  //       pageTitle: 'Downstream smoke tests report',
  //       outputPath: 'output/downstream-smoke-tests.html',
  //     },
  //   ],
  // ],
};
