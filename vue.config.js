module.exports = {
  pwa: {
    manifestOptions: {
      background_color: 'darkgrey'
    },
    name: 'Adventure Hunter',
    themeColor: 'darkgreen'
    /* workboxOptions: {
      manifestTransforms: [
        manifest => ({
          manifest: manifest.concat([
            { revision: 0, url: '/story/json/story.json' }
          ])
        })
      ]
    } */
  }
}
