module.exports = {
  setupFiles: ['<rootDir>/test-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/*.(ts|tsx|js)'],
};
