module.exports = {
  roots: ['<rootDir>/src/test/pact'],
  testRegex: String.raw`(/src/test/pact/*|\.test)\.(ts|js)$`,
  testEnvironment: 'node',
  /* workaround to allow jest to transform ESM js files in node_modules
   (e.g. https-proxy-agent which is pulled in by @pact-foundation/pact) */
  transform: {
    [String.raw`^.+\.(ts|js)$`]: ['ts-jest', { tsconfig: { allowJs: true } }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@pact-foundation|https-proxy-agent|agent-base)/)',
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
};
