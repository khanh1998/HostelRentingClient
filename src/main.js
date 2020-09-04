import Vue from 'vue';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/axios';
import './plugins/element';

Vue.use(VueCookies);
Vue.$cookies.config('7d');
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
