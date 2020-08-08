import VendorView from '../../main-view/Vendor.vue';
import ChatDetail from '../../views/vendor/ChatDetail.vue';
import Overview from '../../views/vendor/Overview.vue';
import HostelManagement from '../../views/vendor/HostelManagement.vue';

const routes = [
  {
    path: '/vendor',
    name: 'VendorMainView',
    component: VendorView,
    children: [
      {
        path: 'chat',
        name: 'ChatDetail',
        component: ChatDetail,
        meta: { requiresAuth: true },
      },
      {
        path: '',
        name: 'Overview',
        component: Overview,
        meta: { requiresAuth: true },
      },
      {
        path: 'management',
        name: 'HostelManagement',
        component: HostelManagement,
        meta: { requiresAuth: true },
      },
    ],
  },
];

export default routes;
