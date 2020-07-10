import Vue from 'vue';
import Vuex from 'vuex';
import HostelType from './modules/hosteltype';
import Home from './modules/home';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    HostelType,
    Home,
  },
});
