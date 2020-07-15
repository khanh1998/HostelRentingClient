import VendorView from '../../main-view/Vendor.vue';
import ChatDetail from '../../views/vendor/ChatDetail.vue';
// import Login from '../../components/vendor/Login.vue';

const routes = [
  {
    path: '/vendor',
    name: 'VendorMainView',
    component: VendorView,
    children: [
      {
        path: '',
        name: 'ChatDetail',
        component: ChatDetail,
      },
    ],
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  // },
];

export default routes;
