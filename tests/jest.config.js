/**
 * @typedef {import('@jest/types').Config.InitialOptions} Config
 */

/** @type {Config} */
const config = {
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['node_modules', '<rootDir>/', 'design'],
  testMatch: ['<rootDir>/**/*.test.ts'],
  coverageProvider: 'v8',
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/../design/$1',
    '~/(.*)$': '<rootDir>/../$1',
  },
  transform: {
    '^.+\\.ts$': [
      '@swc-node/jest',
      {
        paths: {
          '@/*': [`${__dirname}/*`],
        },
      },
    ],
  },
};

module.exports = config;
