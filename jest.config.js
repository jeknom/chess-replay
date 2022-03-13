/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@components': '<rootDir>/src/components/index',
    '^@utils': '<rootDir>/src/utils',
    '^@constants': '<rootDir>/src/constants/index',
    '^@mock/(.*)$': '<rootDir>/mock/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
};
