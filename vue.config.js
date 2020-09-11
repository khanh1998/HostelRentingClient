module.exports = {
  transpileDependencies: ['vuetify'],
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/config/firebase-messaging-sw.js',
      exclude: [
        /\.map$/,
        /_redirects/,
      ],
    },
    devServer: {
      proxy: 'https://hostel-renting.herokuapp.com/',
    },
    name: 'Tìm Phòng Trọ',
  },
};
