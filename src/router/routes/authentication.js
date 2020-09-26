import Login from '../../views/Login.vue';
import Register from '../../views/Register.vue';
// import Register from '../../views/DemoFirebase.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    children: [],
    props: true, // Pass route.params to props
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    children: [],
  },
];

export default routes;
