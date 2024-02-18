export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open:  true,
  watch: true,
  port: 3000,
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },
  plugins: [],
});