module.exports = {
  publicPath: '/',
  chainWebpack: config => {
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/, 
          loader: 'vue-svg-loader', 
        },
      ],
    },     
  },
  devServer: {
    host: '0.0.0.0',
    port: 8081, // CHANGE YOUR PORT HERE!
  },
  pwa: {
    themeColor: '#000',
    msTileColor: '#000',
    appleMobileWebAppCapable: true,
    manifestOptions: {
      icons: [ 
        {
          'src': './img/icons/micon-192x192.png', 
          'sizes': '512x512', 
          'type': 'image/png'
        }, 
        {
          'src': './img/icons/micon-512x512.png', 
          'sizes': '384x384', 
          'type': 'image/png'
        },
        {
          'src': './img/icons/micon-192x192.png', 
          'sizes': '192x192', 
          'type': 'image/png'
        }, 
        {
          'src': './img/icons/micon-512x512.png', 
          'sizes': '152x152', 
          'type': 'image/png'
        }, 
        {
          'src': './img/icons/micon-192x192.png', 
          'sizes': '144x144', 
          'type': 'image/png'
        }, 
        {
          'src': './img/icons/micon-192x192.png', 
          'sizes': '128x128', 
          'type': 'image/png'
        }, 
        {
          'src': './img/icons/micon-192x192.png', 
          'sizes': '96x96', 
          'type': 'image/png'
        }, 
        {
          'src': './img/icons/micon-192x192.png', 
          'sizes': '72x72', 
          'type': 'image/png'
        }, 
        {
          'src': './img/icons/micon-512x512.png', 
          'sizes': '48x48', 
          'type': 'image/png'
        }, 
      ]
    }
  },
};
