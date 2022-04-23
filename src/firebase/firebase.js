import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyACjMmsYLUEecrpMl7CutFVRxPl6r4hYZA',
  authDomain: 'instagramcopy-d9782.firebaseapp.com',
  projectId: 'instagramcopy-d9782',
  storageBucket: 'instagramcopy-d9782.appspot.com',
  messagingSenderId: '583372311990',
  appId: '1:583372311990:web:ca114a32b06753ea5f8517',
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const storage = getStorage(firebase);

export { firebase, db, storage };

