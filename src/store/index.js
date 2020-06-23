import Vue from 'vue';
import Vuex from 'vuex';
import HostelTypeModule from './mudules/hosteltype';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    HostelTypeModule,
  },
});
