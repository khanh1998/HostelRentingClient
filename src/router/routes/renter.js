import RenterView from '../../main-view/Renter.vue';
import HostelDetail from '../../views/renter/HostelDetail.vue';
import Home from '../../views/renter/Home.vue';
import User from '../../views/renter/User.vue';

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
      },
      {
        path: '/detail',
        name: 'HostelDetail',
        component: HostelDetail,
      },
      {
        path: '/user',
        name: 'User',
        component: User,
      },
    ],
  },
];

export default routes;
