module.exports = {
  verbose: true,

  setupFilesAfterEnv: ['<rootDir>src/setupTests.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@$': '<rootDir>/src',
    '^@/(.*)': '<rootDir>/src/$1',
    '/^components/(.*)$/': '<rootDir>/src/components/$1', // You missed out `/` before the rest value `$1`
    // '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '.*\\.(css|less)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}
