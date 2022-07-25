import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD1U3OFbwKw6iRjNUqr9_qMsi64Up_XGbk",
  authDomain: "my-app-8e596.firebaseapp.com",
  projectId: "my-app-8e596",
  storageBucket: "my-app-8e596.appspot.com",
  messagingSenderId: "44647091064",
  appId: "1:44647091064:web:00e946c6671fc49571568d",
  measurementId: "G-WFF7LG40HX"
};

const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage}