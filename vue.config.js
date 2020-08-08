module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/config/firebase-messaging-sw.js',
    },
    devServer: {
      proxy: 'https://hostel-renting.herokuapp.com/',
    },
  },
}
