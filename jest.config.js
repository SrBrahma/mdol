module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  maxWorkers: '50%',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    }
  },
  // transform: {
  //   "^.+\\.tsx?$": "esbuild-jest"
  // }
};