export default {
  resolve: {
    alias: {
      '@': './src'
    }
  },
  test: {
    exclude: ['.docker', 'dist', 'node_modules'],
    coverage: {
      all: true,
      exclude: [
        '**/node_modules/**',
        '**/.docker/**',
        '**/dist/**',
        '**/tests/**'
      ]
    }
  }
};
