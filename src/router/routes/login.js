import Login from '../../views/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    children: [],
    props: true, // Pass route.params to props
  },
];

export default routes;
