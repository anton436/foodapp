import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDUHTqFccGaBK1P8uqJzdHXwzKokVH3NSQ',
  authDomain: 'foodapp-eb628.firebaseapp.com',
  databaseURL: 'https://foodapp-eb628-default-rtdb.firebaseio.com',
  projectId: 'foodapp-eb628',
  storageBucket: 'foodapp-eb628.appspot.com',
  messagingSenderId: '338084477752',
  appId: '1:338084477752:web:e58ac0e664e13398d59fcd',
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
