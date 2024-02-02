// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARVZXRL2HnqB_Ny7giManewn-OVAo5TVc",
  authDomain: "chatapp-b08cb.firebaseapp.com",
  projectId: "chatapp-b08cb",
  storageBucket: "chatapp-b08cb.appspot.com",
  messagingSenderId: "117872551853",
  appId: "1:117872551853:web:87368bda6a7397253c2324",
  measurementId: "G-ZCFQ5LMZVK",
  databaseURL: "https://chatapp-b08cb-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export { database, storage, auth };
export default app;






