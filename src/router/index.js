import Vue from 'vue';
import VueRouter from 'vue-router';
import RenterRoutes from './routes/renter';
import VendorRoutes from './routes/vendor';
import AdminRoutes from './routes/admin';

Vue.use(VueRouter);

const routes = [
  ...RenterRoutes,
  ...VendorRoutes,
  ...AdminRoutes,
];

const router = new VueRouter({
  routes,
});

export default router;
