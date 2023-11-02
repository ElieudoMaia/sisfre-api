export default {
  resolve: {
    alias: {
      '@': './src'
    }
  },
  test: {
    exclude: ['.docker', 'dist', 'node_modules']
  }
};
