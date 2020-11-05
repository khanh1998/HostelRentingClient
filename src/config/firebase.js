import * as firebase from 'firebase/app';
// import constant from './constant';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCWNT4MhALulebmekYoHKbwyAx-htB76tA',
  authDomain: 'td-vue-firestore-chat.firebaseapp.com',
  databaseURL: 'https://td-vue-firestore-chat.firebaseio.com',
  projectId: 'td-vue-firestore-chat',
  storageBucket: 'td-vue-firestore-chat.appspot.com',
  messagingSenderId: '223687361307',
  appId: '1:223687361307:web:ed8fd5232accfb095f09be',
  measurementId: 'G-0K8CSPWJ17',
};
firebase.initializeApp(firebaseConfig);
// initialize cloud firestore through firebase

// const db = firebase.firestore();
// window.db = db;
// // disable deprecated features
// db.settings({
//   timestampsInSnapshots: true,
// });
const store = firebase.firestore();
store.enablePersistence({ synchronizeTabs: true });

let messaging = null;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
  // messaging.usePublicVapidKey(constant.PUBLIC_VAPID_KEY);
  // messaging.getToken({ vapidKey: constant.PUBLIC_VAPID_KEY });
}

const auth = firebase.auth();
auth.onAuthStateChanged(
  (user) => {
    if (user) {
      window.$cookies.set('firebaseLoggedIn', true);
    } else {
      window.$cookies.set('firebaseLoggedIn', false);
    }
  },
  (error) => {
    console.log(error);
  },
);
export default {
  store,
  messaging,
  auth,
  authNamespace: firebase.auth,
};
