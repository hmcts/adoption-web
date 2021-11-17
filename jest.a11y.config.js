module.exports = {
  roots: ['<rootDir>/src/test/a11y'],
  "testRegex": "(/src/test/.*|\\.(test|spec))\\.(ts|js)$",
   "moduleFileExtensions": [
    "ts",
    "js"
  ],
  "testEnvironment": "node",
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    "client/(.*)": "<rootDir>/src/main/app/client/$1",
    "idam/(.*)": "<rootDir>/src/main/app/idam/$1",
    "logging/(.*)": "<rootDir>/src/main/app/logging/$1",
    "common/(.*)": "<rootDir>/src/main/common/$1",
    //utils name clashes with one of the internal jest modules hence need to map individual files
    "utils/callbackBuilder": "<rootDir>/src/main/app/utils/callbackBuilder",
    "utils/stringUtils": "<rootDir>/src/main/app/utils/stringUtils",
    "paths": "<rootDir>/src/main/app/paths",
    // "router/(.*)": "router/$1",
    // "routes/(.*)": "routes/$1",
  }
}
