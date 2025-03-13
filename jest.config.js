module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/backend/tests/**/*.test.js',
    '<rootDir>/frontend/src/**/*.test.jsx',
  ],
};