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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (window.$cookies.get('jwt') === null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    next();
  } else {
    next();
  }
});

export default router;
