import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export const db = app.firestore();
export const storage = firebase.storage();
export const Firebase = firebase;

//for develop in local server => true
//export const LocalServer = true;
export const LocalServer = false;
//for develop with console log every step => true
//export const Develop = true;
export const Develop = false;

export default app;
