import VendorView from '../../main-view/Vendor.vue';
// import ChatDetail from '../../views/vendor/ChatDetail.vue';
import Overview from '../../views/vendor/Overview.vue';

const routes = [
  {
    path: '/vendor',
    name: 'VendorMainView',
    component: VendorView,
    children: [
      // {
      //   path: '',
      //   name: 'ChatDetail',
      //   component: ChatDetail,
      // },
      {
        path: '',
        name: 'Overview',
        component: Overview,
      },
    ],
  },
];

export default routes;
