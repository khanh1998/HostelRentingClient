// import firebase from '../config/firebase';
// const { messaging } = firebase;
function getMessagingToken(messaging) {
  messaging
    .getToken()
    .then(async (token) => {
      if (token) {
        const currentMessageToken = window.localStorage.getItem(
          'messagingToken',
        );
        console.log('token will be updated', currentMessageToken !== token);
        if (currentMessageToken !== token) {
          await this.saveToken(token);
        }
      } else {
        console.log(
          'No Instance ID token available. Request permission to generate one.',
        );
        this.notificationsPermisionRequest();
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
}
function notificationsPermisionRequest(messaging) {
  messaging
    .requestPermission()
    .then(() => {
      this.getMessagingToken();
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
}
function listenTokenRefresh(messaging) {
  const currentMessageToken = window.localStorage.getItem('messagingToken');
  console.log('currentMessageToken', currentMessageToken);
  if (!currentMessageToken) {
    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then((token) => {
          this.saveToken(token);
        })
        .catch((err) => {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });
  }
}
function saveToken(token) {
  console.log('tokens', token);
  window.axios
    .post(
      'https://us-central1-cropchien.cloudfunctions.net/GeneralSubscription',
      { token },
    )
    .then((response) => {
      window.localStorage.setItem('messagingToken', token);
      console.log(response);
    })
    .catch((err) => {
      window.localStorage.setItem('messagingToken', token);
      console.log(err);
    });
}
export default {
  saveToken,
  listenTokenRefresh,
  notificationsPermisionRequest,
  getMessagingToken,
};