import Vue from 'vue';
import VueRouter from 'vue-router';
import HostelDetail from '../views/HostelDetail.vue';
import userRoute from './routes/user';
import homeRoute from './routes/home';

Vue.use(VueRouter);

const routes = [
  homeRoute,
  {
    path: '/detail',
    name: 'HostelDetail',
    component: HostelDetail,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HostelDetail.vue'),
  },
  userRoute,
];

const router = new VueRouter({
  routes,
});

export default router;
