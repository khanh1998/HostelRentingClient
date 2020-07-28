module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    proxy: 'https://hostel-renting.herokuapp.com/',
  },
};
