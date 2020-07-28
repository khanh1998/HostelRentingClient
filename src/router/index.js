import Vue from 'vue';
import VueRouter from 'vue-router';
import * as VueGoogleMaps from 'vue2-google-maps';
import RenterRoutes from './routes/renter';
import VendorRoutes from './routes/vendor';
import AdminRoutes from './routes/admin';

Vue.use(VueRouter);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDcw-KnCAPzni3QYvgk3RDoTZL65xh8a4o',
    libraries: 'places', // necessary for places input
  },
});

const routes = [
  ...RenterRoutes,
  ...VendorRoutes,
  ...AdminRoutes,
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
