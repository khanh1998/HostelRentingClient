import Vue from 'vue';
import axios from 'axios';
import utils from '../utils/utils';
import checkForUpdates from '../utils/updates';
import constant from '../config/constant';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || constant.VUE_APP_API_URL;
axios.defaults.headers.common['Accept-Language'] =
  JSON.parse(localStorage.getItem('locale')) || 'en';

axios.interceptors.request.use(
  async (config) => {
    const myConfig = { ...config };
    // Do something before request is sent
    // If request is different than any of the URLS in urlsExcludedForBearerHeader
    // then send Authorization header with token from localstorage
    const urlsExcludedForBearerHeader = [
      '/login',
      '/register',
      '/types',
      '/schools',
      '/statistic',
      '/facilities',
      '/services',
      '/provinces',
      '/utilities',
    ];
    if (utils.checkIfTokenNeedsRefresh() === true) {
      await utils.updateToken();
    }
    if (urlsExcludedForBearerHeader.every((url) => !url.includes(myConfig.url))) {
      myConfig.headers.Authorization = `Bearer ${window.$cookies.get('firebaseIdToken')}`;
    }
    return myConfig;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    // Checks if app is being used in mobile
    if (
      response.config.url !== `${process.env.VUE_APP_API_URL}/token` &&
      response.config.url !== `${window.location.origin}/version.json`
    ) {
      checkForUpdates();
      utils.checkIfTokenNeedsRefresh();
    }
    return response;
  },
  (error) => {
    // Do something with response error
    Promise.reject(error);
  },
);

const Plugin = {
  install: (VueObject) => {
    // const myVue = { ...Vue };
    // eslint-disable-next-line no-param-reassign
    VueObject.axios = axios;
    window.axios = axios;
    Object.defineProperties(VueObject.prototype, {
      axios: {
        get() {
          return axios;
        },
      },
      $axios: {
        get() {
          return axios;
        },
      },
    });
  },
};

Vue.use(Plugin);

export default Plugin;
