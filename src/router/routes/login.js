import Login from '../../views/Login.vue';
import Camera from '../../components/vendor/hostel_management/Camera.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true, // Pass route.params to props
  },
  {
    path: '/camera',
    name: 'Camera',
    component: Camera,
    props: true, // Pass route.params to props
  },
];

export default routes;
