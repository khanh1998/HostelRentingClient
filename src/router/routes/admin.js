import AdminView from '../../main-view/Admin.vue';

const routes = [
  {
    path: '/admin',
    name: 'AdminMainView',
    component: AdminView,
    // children: [],
    meta: {
      requiresAuth: false,
      is_admin: true,
    },
  },
];

export default routes;
