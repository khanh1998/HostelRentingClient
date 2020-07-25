import firebase from 'firebase';
// Required for side-effects
require('firebase/firestore');

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
firebase.firestore();
export default firebase;
