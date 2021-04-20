module.exports = {
  pwa: {
    manifestOptions: {
      background_color: 'darkgrey'
    },
    name: 'Adventure Hunter',
    themeColor: 'darkgreen',
    workboxOptions: {
      runtimeCaching: [
        {
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 5
          },
          urlPattern: 'https://api.kanye.rest'
        }
      ]
    }
  },
  publicPath: '/adventurehunter/'
}
