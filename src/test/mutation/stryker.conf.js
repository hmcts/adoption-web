module.exports = {
  tsconfigFile: 'tsconfig.json',
  reporters: ['clear-text', 'progress', 'html'],
  htmlReporter: { baseDir: 'functional-output/mutation-assets' },
  coverageAnalysis: 'perTest',
  mutate: ['src/main/**/*.ts', '!src/main/**/*content*.ts', '!src/main/**/*.test.ts'],
  ignorePatterns: ['**', '!config/**', '!src/main/**', '!src/test/unit/**', '!jest.mutation.config.js'],
  testRunner: 'jest',
  jest: {
    configFile: 'jest.mutation.config.js',
    enableFindRelatedTests: true,
  },
  concurrency: 10,
  // logLevel: 'debug'
};
