module.exports = {
  roots: ['<rootDir>/src/test/pact'],
  testRegex: '(/src/test/pact/*|\\.test)\\.(ts|js)$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@pact-foundation|https-proxy-agent|agent-base)/)',
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
};
