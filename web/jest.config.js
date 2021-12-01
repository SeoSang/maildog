module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.[t|j]sx?$': '@swc-node/jest',
  },
  coverageReporters: ['json-summary', 'json', 'lcov', 'text', 'text-summary'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
}
