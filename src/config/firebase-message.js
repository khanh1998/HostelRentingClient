import firebase from './firebase';

const messaging = firebase.messaging();
messaging.requestPermission()
  .then(() => {
    console.log('grant permission');
    return messaging.getToken();
  })
  .then((token) => console.log(token))
  .catch((err) => console.log(err));
