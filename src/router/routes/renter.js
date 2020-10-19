import RenterView from '../../main-view/Renter.vue';
import HostelDetail from '../../views/renter/HostelDetail.vue';
import HostelGroup from '../../views/renter/HostelGroup.vue';
import Home from '../../views/renter/Home.vue';
import User from '../../views/renter/User.vue';
import ViewCart from '../../views/renter/ViewCart.vue';
import ViewContracts from '../../views/renter/ViewContracts.vue';
import Appointment from '../../views/renter/Appointment.vue';
import QrReader from '../../views/renter/QrReader.vue';
import FilterResult from '../../views/renter/FilterResult.vue';
import DiscoveryOverivew from '../../views/renter/DiscoveryOverview.vue';
import DiscoveryDistrict from '../../views/renter/DiscoveryDistrict.vue';

const routes = [
  {
    path: '/',
    component: RenterView,
    children: [
      {
        path: 'index.html',
        name: 'Home',
        component: Home,
        meta: { guest: true },
        alias: '',
      },
      {
        path: 'detail/:typeId',
        name: 'HostelDetail',
        component: HostelDetail,
        meta: { guest: true },
      },
      {
        path: 'group/:groupId',
        name: 'HostelGroup',
        component: HostelGroup,
        meta: { guest: true },
      },
      {
        path: 'user',
        name: 'User',
        component: User,
        meta: { requiresAuth: true, is_renter: true },
      },
      {
        path: 'cart',
        name: 'ViewCard',
        component: ViewCart,
        meta: { requiresAuth: true, is_renter: true },
      },
      {
        path: 'contract',
        name: 'ViewContracts',
        component: ViewContracts,
        meta: { requiresAuth: true, is_renter: true },
      },
      {
        path: 'appointment',
        name: 'Appointment',
        component: Appointment,
        meta: { requiresAuth: true, is_renter: true },
      },
      {
        path: 'qr',
        name: 'QrReader',
        component: QrReader,
        // meta: { requiresAuth: true },
      },
      {
        path: 'result/:searchValue',
        name: 'FilterResult',
        component: FilterResult,
        props: true,
      },
      {
        path: 'discovery',
        name: 'DiscoveryOverview',
        component: DiscoveryOverivew,
        props: true,
      },
      {
        path: 'discovery/:districtId',
        name: 'DiscoveryDistrict',
        component: DiscoveryDistrict,
        props: true,
      },
    ],
  },
];

export default routes;
