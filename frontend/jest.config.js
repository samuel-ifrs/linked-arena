module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|expo|@expo|@unimodules|@react-navigation)/)",
  ],
};