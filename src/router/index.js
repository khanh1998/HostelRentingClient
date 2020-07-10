import Vue from 'vue';
import VueRouter from 'vue-router';
import userRoute from './routes/user';
import homeRoute from './routes/home';
import viewCartRoute from './routes/viewcart';
import HostelDetailRoute from './routes/details';

Vue.use(VueRouter);

const routes = [
  homeRoute,
  HostelDetailRoute,
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HostelDetail.vue'),
  },
  userRoute,
  viewCartRoute,
];

const router = new VueRouter({
  routes,
});

export default router;
