module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  transform: {
    '^.+\\.(ts|mjs|html|js)$': 'ts-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  coverageReporters: ['html']
};
