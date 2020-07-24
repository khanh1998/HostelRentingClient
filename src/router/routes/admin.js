import AdminView from '../../main-view/Admin.vue';

const routes = [
  {
    path: '/admin',
    name: 'AdminMainView',
    component: AdminView,
    children: [],
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
  },
];

export default routes;
