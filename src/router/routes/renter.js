import RenterView from '../../main-view/Renter.vue';
import HostelDetail from '../../views/renter/HostelDetail.vue';
import Home from '../../views/renter/Home.vue';
import User from '../../views/renter/User.vue';
import ViewCart from '../../views/renter/ViewCart.vue';
import QrReader from '../../views/renter/QrReader.vue';
import FilterResult from '../../views/renter/FilterResult.vue';

const routes = [
  {
    path: '/',
    name: 'RenterMainView',
    component: RenterView,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: { guest: true },
      },
      {
        path: '/detail/:typeId',
        name: 'HostelDetail',
        component: HostelDetail,
        meta: { guest: true },
      },
      {
        path: '/user',
        name: 'User',
        component: User,
        meta: { requiresAuth: true, is_renter: true },
      },
      {
        path: '/cart',
        name: 'ViewCard',
        component: ViewCart,
        meta: { requiresAuth: true, is_renter: true },
      },
      {
        path: '/qr',
        name: 'QrReader',
        component: QrReader,
        // meta: { requiresAuth: true },
      },
      {
        path: '/filter',
        name: 'FilterResult',
        component: FilterResult,
        props: true,
      },
    ],
  },
];

export default routes;
