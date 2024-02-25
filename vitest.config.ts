import tsconfigPaths from 'vite-tsconfig-paths';

export default {
  plugins: [tsconfigPaths()],
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
