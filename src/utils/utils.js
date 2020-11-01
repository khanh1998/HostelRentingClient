import jwt from 'jsonwebtoken';
import firebase from '../config/firebase';

const { auth } = firebase;

export function checkIfTokenNeedsRefresh() {
  const firebaseIdToken = window.$cookies.get('firebaseIdToken');
  if (firebaseIdToken) {
    const decoded = jwt.decode(firebaseIdToken);
    const { exp } = decoded;
    if (exp && exp < (new Date().getTime() + 1) / 1000) {
      console.log('firebase id token needs to refresh');
      return true;
    }
    console.log('firebase id token doesnt need to refresh');
    return false;
  }
  return false;
}

export async function updateToken() {
  console.log('update firebase id token');
  const newFirebaseIdToken = auth.currentUser.getIdToken(true);
  // window.$cookies.set('firebaseIdToken', newFirebaseIdToken);
  console.log(newFirebaseIdToken);
}
