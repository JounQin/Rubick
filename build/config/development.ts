export default config => ({
  devTool: '#eval-source-map',
  publicPath: `http://${config.serverHost}:${config.serverPort}/`,
  hashType: 'hash',
  minimize: false,
})
