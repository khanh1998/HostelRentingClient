import Vue from 'vue';
import VueRouter from 'vue-router';
import RenterRoutes from './routes/renter';
import VendorRoutes from './routes/vendor';
import AdminRoutes from './routes/admin';
import LoginRoutes from './routes/login';

Vue.use(VueRouter);

const routes = [
  ...RenterRoutes,
  ...VendorRoutes,
  ...AdminRoutes,
  ...LoginRoutes,
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
