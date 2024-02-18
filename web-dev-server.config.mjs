export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open:  true,
  watch: true,
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },
  plugins: [],
});