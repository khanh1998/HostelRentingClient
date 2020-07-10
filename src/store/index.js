import Vue from 'vue';
import Vuex from 'vuex';
import AdminStore from './modules/admin';
import RenterStore from './modules/rentor';
import VendorStore from './modules/vendor';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin: AdminStore,
    renter: RenterStore,
    vendor: VendorStore,
  },
});
