import VendorView from '../../main-view/Vendor.vue';
import Overview from '../../views/vendor/Overview.vue';
import HostelManagement from '../../views/vendor/HostelManagement.vue';
import QRGeneration from '../../components/vendor/overview/QRGeneration.vue';
import VendorBooking from '../../views/vendor/Booking.vue';
import VendorSchedule from '../../views/vendor/Schedule.vue';

const routes = [
  {
    path: '/vendor',
    name: 'VendorMainView',
    component: VendorView,
    children: [
      {
        path: '',
        name: 'Overview',
        component: Overview,
        meta: { requiresAuth: true, is_vendor: true },
      },
      {
        path: 'management',
        name: 'HostelManagement',
        component: HostelManagement,
        meta: { requiresAuth: true, is_vendor: true },
      },
      {
        path: 'qrgeneration',
        name: 'QRGeneration',
        component: QRGeneration,
        meta: { requiresAuth: true },
      },
      {
        path: 'booking',
        name: 'VendorBooking',
        component: VendorBooking,
        meta: { requiresAuth: true, is_vendor: true },
      },
      {
        path: 'schedule',
        name: 'VendorSchedule',
        component: VendorSchedule,
        meta: { requiresAuth: true, is_vendor: true },
      },
    ],
  },
];

export default routes;
