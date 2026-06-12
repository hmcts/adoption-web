module.exports = {
  roots: ['<rootDir>/src/test/pact'],
  testRegex: String.raw`(/src/test/pact/*|\.test)\.(ts|js)$`,
  testEnvironment: 'node',
  transform: {
    [String.raw`^.+\.[tj]s$`]: ['ts-jest', { tsconfig: { allowJs: true } }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@pact-foundation|https-proxy-agent|agent-base)/)',
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
};
