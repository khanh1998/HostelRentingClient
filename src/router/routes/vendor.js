import VendorView from '../../main-view/Vendor.vue';
import ChatDetail from '../../views/vendor/ChatDetail.vue';

const routes = [
  {
    path: '/vendor',
    name: 'VendorMainView',
    component: VendorView,
    children: [
      {
        path: '/chat',
        name: 'ChatDetail',
        component: ChatDetail,
      },
    ],
  },
];

export default routes;
